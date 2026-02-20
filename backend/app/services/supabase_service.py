import os
from supabase import create_client, Client
from dotenv import load_dotenv
from pathlib import Path

# Load .env
env_file = Path("") / ".env"
load_dotenv(dotenv_path=env_file)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_all_ordered_pizzas():
    response = (
        supabase.table("order_items")
        .select("item_name")
        .execute()
    )

    if not response.data:
        return []

    return [item["item_name"] for item in response.data]

def get_user_orders_from_db(user_id: str):
    response = (
        supabase.table("orders")
        .select("""
            id,
            created_at,
            order_items (
                item_name,
                quantity,
                menu_items (
                    description,
                    vegetarian,
                    spicy
                )
            )
        """)
        .eq("user_id", user_id)
        .execute()
    )

    shaped_data = []

    for order in response.data:
        for item in order["order_items"]:
            shaped_data.append({
                "pizza_name": item["item_name"],
                "timestamp": order["created_at"]
            })

    return shaped_data