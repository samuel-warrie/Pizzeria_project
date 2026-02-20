from fastapi import APIRouter
from app.recommender.model import get_popular_pizzas
from app.recommender.model import get_diet_recommendations
from app.recommender.model import recommend_for_user

router = APIRouter()

@router.get("/popular")
def get_popular():
    return get_popular_pizzas()

@router.get("/user/{user_id}")
def get_user_recommendations(user_id: str):
    return recommend_for_user(user_id)

@router.get("/diet/{diet_type}")
def get_diet(diet_type: str):
    return get_diet_recommendations(diet_type)
