from fastapi import FastAPI
from app.api import pizzas

app = FastAPI()

app.include_router(pizzas.router, prefix="/pizzas", tags=["Menu"])