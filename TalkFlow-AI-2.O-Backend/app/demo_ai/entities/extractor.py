import re
import difflib


class EntityExtractor:

    def __init__(self):

        # ===============================
        # Number mappings
        # ===============================

        self.number_map = {
            # Roman Urdu
            "ek": 1,
            "do": 2,
            "teen": 3,
            "char": 4,
            "chaar": 4,
            "panch": 5,
            "paanch": 5,
            "chay": 6,
            "chhe": 6,
            "saat": 7,
            "aath": 8,
            "nau": 9,
            "das": 10,

            # Urdu Script
            "ایک": 1,
            "دو": 2,
            "تین": 3,
            "چار": 4,
            "پانچ": 5,
            "چھ": 6,
            "سات": 7,
            "آٹھ": 8,
            "نو": 9,
            "دس": 10
        }

        # ===============================
        # Menu Item Keywords (Scalable)
        # ===============================

        self.item_keywords = {
            "nehari": [
                "nehari",
                "nihari",
                "نہاری",
                "فلنہاری",
                "نهاری"
            ],
            "cold drink": [
                "cold drink",
                "cold drinks",
                "coldrink",
                "drink",
                "drinks",
                "ڈرینک",
                "کالڈرینک",
                "dring",
                "rings"
            ]
        }

    # ===============================
    # Number Extraction
    # ===============================

    def extract_number(self, text):
        digit_match = re.search(r"\d+", text)
        if digit_match:
            return int(digit_match.group())

        words = text.split()
        for word in words:
            if word in self.number_map:
                return self.number_map[word]

        return None

    # ===============================
    # Plate Extraction
    # ===============================

    def extract_plate(self, text):
        text = text.lower()

        if "half" in text or "آدھی" in text:
            return "half"

        if "full" in text or "فل" in text:
            return "full"

        return None

    # ===============================
    # Fuzzy Matching
    # ===============================

    def is_similar(self, word, keyword, threshold=0.6):
        similarity = difflib.SequenceMatcher(None, word, keyword).ratio()
        return similarity >= threshold

    def matches_keyword(self, text_part, keyword_list):
        words = text_part.split()

        for word in words:
            for keyword in keyword_list:
                if keyword in text_part:
                    return True
                if self.is_similar(word, keyword):
                    return True

        return False

    # ===============================
    # Main Item Extraction
    # ===============================

    def extract_items(self, text):

        text = text.lower()
        items = []

        # Split multi-item sentences
        parts = re.split(r"\baur\b|\band\b|,", text)

        for part in parts:

            quantity = self.extract_number(part) or 1
            plate = self.extract_plate(part)

            for item_name, keywords in self.item_keywords.items():

                if self.matches_keyword(part, keywords):

                    item_data = {
                        "item": item_name,
                        "quantity": quantity
                    }

                    # Only nehari needs plate
                    if item_name == "nehari":
                        item_data["plate"] = plate if plate else "full"

                    items.append(item_data)
                    break

        return items