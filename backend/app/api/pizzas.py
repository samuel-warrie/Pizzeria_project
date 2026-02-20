import os
from pathlib import Path
from fastapi import APIRouter
from supabase import create_client, Client
from dotenv import load_dotenv

router = APIRouter()

env_file = Path("") / '.env'
load_dotenv(dotenv_path=env_file)

supabase:Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

@router.get("/menu-items")
async def list_pizzas():
    response = supabase.table("menu_items").select("*").execute()
    print(response.data)
    return response.data




@router.get("/orders")
async def get_pizza_recommendations():
    response = supabase.table("pizza_recommendations").select("*").execute()
    return response.data



@router.get("/user/{user_id}")
async def get_user_orders(user_id: str):
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
        order_id = order['id']
        timestamp = order['created_at'][:10]
        
        for item in order['order_items']:
          
            details = item.get('menu_items', {})
            
            shaped_data.append({
                "order_id": order_id,
                "user_id": user_id,
                "pizza_name": item['item_name'],
                "quantity": item['quantity'],
                "description": details.get('description', ""),
                "is_veg": details.get('vegetarian', False),
                "is_spicy": details.get('spicy', False),
                "timestamp": timestamp
            })

    return shaped_data