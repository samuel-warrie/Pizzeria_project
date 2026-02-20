import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function RecommendPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log("Current user:", user);
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError(null);
    fetch(`http://127.0.0.1:8000/pizzas/user/${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Recommended for You
        </h1>
        {!user && <div>Please log in to see your recommendations.</div>}
        {loading && ( <div className="text-center py-10 text-gray-500 animate-pulse">
         Finding pizzas you'll love 🍕
        </div>)}

        {error && (
  <div className="text-center py-10">
    <p className="text-red-500 font-semibold mb-2">
       Oops! We couldn’t load your recommendations.
    </p>
    

    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
    >
      Try Again
    </button>
    </div>)}

        {orders && Array.isArray(orders) && orders.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {orders.map((order: any) => (
              <div
                key={order.order_id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg text-sm"
              >
                <div className="h-20 bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {order.pizza_name[0]}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                    {order.pizza_name}
                  </h3>
                  <p className="text-gray-600 text-xs mb-1">
                    {order.description}
                  </p>
                  <div className="flex items-center gap-1 mb-1">
                    {order.is_spicy && (
                      <span className="text-xs px-1 py-0.5 rounded bg-red-100 text-red-700">
                        Spicy
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-orange-600">
                      Qty: {order.quantity}
                    </span>
                    <span className="text-xs text-gray-400">
                      {order.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : orders && Array.isArray(orders) && orders.length === 0 ? (
          <div>No past orders found.</div>
        ) : null}
      </div>
    </div>
  );
}
