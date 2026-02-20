import yaml
import random
from app.demo_ai.entities.extractor import EntityExtractor


class ResponseManager:
    def __init__(self):
        with open("app/demo_ai/response/responses.yaml", "r", encoding="utf-8") as file:
            self.responses = yaml.safe_load(file)

        self.extractor = EntityExtractor()

    def user_finished_ordering(self, text):
        triggers = ["bas", "ho gaya", "complete", "aur nahi", "nahi"]
        return any(trigger in text.lower() for trigger in triggers)

    def is_ordering_sentence(self, text):
        text = text.lower()

        order_keywords = [
            "chahiye",
            "order",
            "de do",
            "bhej do",
            "add",
            "kardein",
            "kar dein",
            "kar do",
            "Kar dein"
        ]

        # If explicit ordering words
        if any(word in text for word in order_keywords):
            return True

        # If contains item name + number
        if (
            ("nehari" in text or "cold drink" in text)
            and any(char.isdigit() for char in text)
        ):
            return True

        # If contains item + plate
        if (
            ("nehari" in text)
            and ("half" in text or "full" in text)
        ):
            return True

        return False


    def generate_response(self, intent_result: dict, user_text: str, state):

        print(f"[DEBUG] Current Mode: {state.mode}")


        intent = intent_result.get("intent")
        confidence = intent_result.get("confidence", 0)
        text_lower = user_text.lower()

        # ==========================================
        # MODE-BASED STATE MACHINE
        # ==========================================

        # ---------------- BOOKING PEOPLE ----------------
        if state.mode == "booking_people":
            qty = self.extractor.extract_number(user_text)
            if qty:
                state.entities["booking_people"] = qty
                state.mode = "booking_datetime"
                return "Date aur time bata dein."
            return "Kitne logon ke liye table reserve karni hai?"

        # ---------------- BOOKING DATETIME ----------------
        if state.mode == "booking_datetime":
            state.entities["booking_datetime"] = user_text
            people = state.entities.get("booking_people")
            datetime_value = user_text

            state.mode = "neutral"
            return (
                f"Aapka table reserve ho gaya hai 🎉\n\n"
                f"{people} log\n"
                f"{datetime_value}"
                f"\n\nKya aapko aur kuch chahiye?"
            )

        # ---------------- ORDERING MODE ----------------
        if state.mode == "ordering":

            if self.user_finished_ordering(user_text):
                state.mode = "awaiting_confirmation"
                summary = state.get_cart_summary()
                return (
                    f"Aapka final order:\n\n{summary}\n\n"
                    f"1. Confirm order\n"
                    f"2. Modify order\n"
                    f"3. Cancel order"
                )

            items = self.extractor.extract_items(user_text)

            if items:
                for item in items:
                    state.add_to_cart(item)
                return "Items cart mein add kar di gayi hain 😊\nKya aur kuch chahiye?"

            return "Kya aur kuch add karna hai?"

        # ---------------- AWAITING CONFIRMATION ----------------
        if state.mode == "awaiting_confirmation":

            if text_lower in ["1", "confirm", "haan", "yes"]:
                state.mode = "awaiting_service_type"
                return "Delivery ya dine-in?"

            if text_lower in ["2", "modify"]:
                state.mode = "ordering"
                return "Ji batayein kya change karna hai?"

            if text_lower in ["3", "cancel"]:
                state.reset_order()
                return "Order cancel kar diya gaya hai."

            return "1. Confirm order\n2. Modify order\n3. Cancel order"

        # ---------------- SERVICE TYPE ----------------
        if state.mode == "awaiting_service_type":

            if "delivery" in text_lower:
                state.mode = "awaiting_address"
                return "Apna complete address share karein."

            if "dine" in text_lower:
                summary = state.get_cart_summary()
                state.reset_order()
                return f"Aapka order confirm ho gaya 🎉\n\n{summary}\n\nDine-in select kiya gaya hai."

            return "Delivery ya dine-in?"

        # ---------------- ADDRESS MODE ----------------
        if state.mode == "awaiting_address":
            summary = state.get_cart_summary()
            address = user_text
            state.reset_order()
            return f"Order confirm ho gaya 🎉\n\n{summary}\n\nDelivery address:{address}"

        # ==========================================
        # NEUTRAL MODE LOGIC
        # ==========================================

        if state.mode == "neutral":

            # Booking trigger
            if "table" in text_lower:
                state.mode = "booking_people"
                return "Kitne logon ke liye table reserve karni hai?"

            # Ordering trigger
            if self.is_ordering_sentence(user_text):
                items = self.extractor.extract_items(user_text)

                if items:
                    state.mode = "ordering"
                    for item in items:
                        state.add_to_cart(item)
                    return "Items cart mein add kar di gayi hain 😊\nKya aur kuch chahiye?"

                state.mode = "ordering"
                return "Kya order karna chahte hain?"
            
            if text_lower in ["yes", "haan"]:
                state.mode = "neutral"
                return "Ji, Shukriya!"

        # ==========================================
        # LOW CONFIDENCE
        # ==========================================

        if intent == "unknown" or confidence < 0.50:
            return "Maaf kijiye, kya aap dobara wazeh kar sakte hain?"

        # ==========================================
        # NORMAL INTENT
        # ==========================================

        if intent == "greeting":
            return random.choice(self.responses["greeting"])

        if intent in self.responses:
            return random.choice(self.responses[intent])

        return "Maaf kijiye, samajh nahi aaya."
