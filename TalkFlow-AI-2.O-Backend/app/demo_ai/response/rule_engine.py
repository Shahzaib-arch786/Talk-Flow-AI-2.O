import yaml
import random
import os
import re

RESPONSES_PATH = os.path.join(
    os.path.dirname(__file__),
    "responses.yaml"
)


class RuleEngine:

    def __init__(self):
        with open(RESPONSES_PATH, "r", encoding="utf-8") as file:
            self.responses = yaml.safe_load(file)

    def generate(self, intent: str, user_text: str):

        user_text = user_text.lower()

        # =========================
        # ITEM DETAILS (SMART)
        # =========================
        if intent == "item_details":

            if "cold drink" in user_text or "drink" in user_text:
                return "Ji haan, cold drink available hai. Coke, Sprite aur Fanta mil jati hai. Aapko konsi order karni hai?"
            if "coke" in user_text:
                return "Ji haan, Coke available hai. Aapko kitni quantity chahiye? hamare paas half liter aur 1 liter dono available hain."
            if "sprite" in user_text:
                return "Ji haan, Sprite available hai. Aapko kitni quantity chahiye? hamare paas half liter aur 1 liter dono available hain."
            if "fanta" in user_text:
                return "Ji haan, Fanta available hai. Aapko kitni quantity chahiye? hamare paas half liter aur 1 liter dono available hain."
            if "half liter" in user_text or "0.5 liter" in user_text:
                return "Ji bilkul! Half liter cold drink aapke order mein add kar diya gaya hai."
            if "1 liter" in user_text or "one liter" in user_text:
                return "Ji bilkul! 1 liter cold drink aapke order mein add kar diya gaya hai."
            
            

            if "half" in user_text:
                return "Half plate 2-3 logon ke liye kaafi hoti hai."
            if "full" in user_text:
                return "Full plate 4-5 logon ke liye suitable hoti hai."

            return "Ji half aur full plate dono available hain."

        # =========================
        # MENU INQUIRY
        # =========================
        if intent == "menu_inquiry":
            return "Hamare paas Waris Special Nehari, Maghaz Nehari aur Beef Nehari available hai."

        # =========================
        # Default behavior
        # =========================
        if intent not in self.responses:
            return "Maaf kijiye, main samajh nahi paaya."

        return random.choice(self.responses[intent])
