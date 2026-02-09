from fastapi import APIRouter

router = APIRouter()

@router.get("/popular")
def get_popular():
    return {"message": "Popular recommendation endpoint working"}

@router.get("/user/{user_id}")
def get_user_recommendations(user_id: int):
    return {"message": f"User recommendation endpoint working for {user_id}"}

@router.get("/diet/{diet_type}")
def get_diet_recommendations(diet_type: str):
    return {"message": f"Diet recommendation endpoint working for {diet_type}"}
