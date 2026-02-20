# app/demo_ai/memory/conversation_state.py

from typing import Dict, Any


class ConversationState:
    def __init__(self):
        self.reset()

    def reset(self):
        self.mode = "neutral"

        self.entities: Dict[str, Any] = {}
        self.cart = []

    # ==========================
    # CART MANAGEMENT
    # ==========================

    def add_to_cart(self, item_data: dict):
        for existing in self.cart:
            if (
                existing["item"] == item_data["item"]
                and existing.get("plate") == item_data.get("plate")
            ):
                existing["quantity"] += item_data["quantity"]
                return
        self.cart.append(item_data)

    def get_cart_summary(self):
        if not self.cart:
            return "Aapka cart abhi khaali hai."

        lines = []
        for item in self.cart:
            line = f"{item['quantity']} x {item['item']}"
            if item.get("plate"):
                line += f" ({item['plate']})"
            lines.append(line)

        return "\n".join(lines)

    def clear_cart(self):
        self.cart = []

    def reset_order(self):
        self.clear_cart()
        self.mode = "neutral"


class ConversationManager:
    def __init__(self):
        self.sessions: Dict[str, ConversationState] = {}

    def get_state(self, session_id: str) -> ConversationState:
        if session_id not in self.sessions:
            self.sessions[session_id] = ConversationState()
        return self.sessions[session_id]
