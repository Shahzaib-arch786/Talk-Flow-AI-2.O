import re


class EntityExtractor:
    def __init__(self):
        self.roman_number_map = {
            "ek": 1,
            "do": 2,
            "teen": 3,
            "chaar": 4,
            "char": 4,
            "paanch": 5,
            "panch": 5,
            "chay": 6,
            "chhe": 6,
            "saat": 7,
            "aath": 8,
            "nau": 9,
            "das": 10
        }

    def extract_number(self, text):
        # Check digits first
        digit_match = re.search(r"\d+", text)
        if digit_match:
            return int(digit_match.group())

        # Check Roman Urdu numbers
        words = text.lower().split()
        for word in words:
            if word in self.roman_number_map:
                return self.roman_number_map[word]

        return None

    def extract_plate(self, text):
        text = text.lower()
        if "half" in text:
            return "half"
        if "full" in text:
            return "full"
        return None

    def extract_items(self, text):
        """
        Extract multiple items from sentence.
        Returns list of dicts:
        [
            {"item": "nehari", "quantity": 2, "plate": "full"},
            {"item": "cold drink", "quantity": 3}
        ]
        """
        text = text.lower()
        items = []

        # Split by 'aur' or 'and'
        parts = re.split(r"\baur\b|\band\b", text)

        for part in parts:
            quantity = self.extract_number(part) or 1
            plate = self.extract_plate(part)

            if "nehari" in part:
                items.append({
                    "item": "nehari",
                    "quantity": quantity,
                    "plate": plate if plate else "full"
                })

            elif "cold drink" in part:
                items.append({
                    "item": "cold drink",
                    "quantity": quantity
                })

        return items
