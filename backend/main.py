from fastapi import FastAPI
from app.api import pizzas, recommendations

app = FastAPI()

app.include_router(pizzas.router, prefix="/pizzas", tags=["Menu"])
app.include_router(recommendations.router, prefix="/recommend", tags=["Recommendations"])