import re

def clean_text(text: str):
    text = text.lower()

    # Remove punctuation
    text = re.sub(r"[^\w\s]", " ", text)

    # Normalize common Roman Urdu variations
    replacements = {
        "mujy": "mujhe",
        "mjy": "mujhe",
        "krni": "karni",
        "krna": "karna",
        "chahiya": "cheyay",
        "chaiye": "chahiye",
        "hni": "hain",
        "ha": "hai",
        "hn": "hain",

    }

    for wrong, correct in replacements.items():
        text = text.replace(wrong, correct)

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text).strip()

    return text
