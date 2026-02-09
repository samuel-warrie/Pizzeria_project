import pandas as pd

def load_data():
    orders = pd.read_csv("data/orders.csv")
    menu = pd.read_csv("data/menu.csv")
    return orders, menu
