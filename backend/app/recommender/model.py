import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.services.supabase_service import get_user_orders_from_db
from collections import Counter
from app.services.supabase_service import get_all_ordered_pizzas

menu = pd.read_csv("data/menu.csv")

menu["features"] = (
    menu["ingredients"] + " " +
    menu["category"] + " " +
    menu["diet"]
)

vectorizer = TfidfVectorizer()
feature_matrix = vectorizer.fit_transform(menu["features"])
similarity_matrix = cosine_similarity(feature_matrix)

#Popularity-based recommender
def get_popular_pizzas(top_n=3):
    pizzas = get_all_ordered_pizzas()

    if not pizzas:
        return ["Margherita"] 

    counter = Counter(pizzas)
    most_common = counter.most_common(top_n)

    return [pizza[0] for pizza in most_common]

#Dietary recommender
def get_diet_recommendations(diet_type, top_n=3):
    filtered = menu[menu["diet"] == diet_type]

    #if no matches found
    if filtered.empty:
        return {"error": "No pizzas found for this diet type"}

    #return random selection of pizzas from the filtered list
    return filtered["name"].sample(min(top_n, len(filtered))).tolist()

#Content-based recommender

def recommend_similar_pizzas(pizza_name, top_n=3):
    #find index of pizza
    idx = menu[menu["name"] == pizza_name].index

    if len(idx) == 0:
        return {"error": "Pizza not found"}

    idx = idx[0]

    #get similarity scores
    scores = list(enumerate(similarity_matrix[idx]))

    #sort by similarity
    scores = sorted(scores, key=lambda x: x[1], reverse=True)

    #skip first one since it's the same pizza
    similar_indices = [i[0] for i in scores[1:top_n+1]]
    return menu.iloc[similar_indices]["name"].tolist()

def recommend_for_user(user_id: str, top_n=3):
    user_orders = get_user_orders_from_db(user_id)

    if not user_orders:
        return ["Margherita"] 

    last_pizza = user_orders[-1]["pizza_name"]

    return recommend_similar_pizzas(last_pizza, top_n)

