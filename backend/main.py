from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import pizzas, recommendations

app = FastAPI()

app.include_router(pizzas.router, prefix="/pizzas", tags=["Menu"])
app.include_router(recommendations.router, prefix="/recommend", tags=["Recommendations"])



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pizzas.router, prefix="/pizzas", tags=["Menu"])
