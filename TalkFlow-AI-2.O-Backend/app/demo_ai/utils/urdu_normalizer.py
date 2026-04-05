def urdu_to_roman(text: str) -> str:
    replacements = {
        "مجھے": "mujhe",
        "چاہیے": "chahiye",
        "نہاری": "nihari",
        "دو": "2",
        "تین": "3",
        "ایک": "1",
        "اور": "aur",
        "کولا": "cola",
        "پانی": "pani",
        "چکن": "chicken",
        "بیف": "beef",
    }

    for urdu, roman in replacements.items():
        text = text.replace(urdu, roman)

    return text.lower()