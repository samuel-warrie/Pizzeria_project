import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const RECOMMENDATIION_ENDPOINT = "http://127.0.0.1:8000/recommend/user";
const ORDERS_ENDPOINT = "http://127.0.0.1:8000/pizzas/user/";
export default function RecommendPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<any[] | null>(null);
  const [recommendLoading, setRecommendLoading] = useState(false);
  const [recommendError, setRecommendError] = useState<string | null>(null);

  console.log("Current user:", user);
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError(null);
    fetch(`${ORDERS_ENDPOINT}${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched orders:", data);
        setOrders(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  const handleRecommend = async () => {
    if (!user) return;

    setRecommendLoading(true);
    setRecommendError(null);

    try {
      const res = await fetch(`${RECOMMENDATIION_ENDPOINT}/${user.id}`);
      if (!res.ok) throw new Error("Failed to fetch recommendations");
      const data = await res.json();
      setRecommendations(Array.isArray(data) ? data : [data]);
    } catch (err: any) {
      setRecommendError(err.message || "Failed to fetch recommendations");
    } finally {
      setRecommendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Your Past Orders
          </h1>
          <button
            onClick={handleRecommend}
            disabled={!user || recommendLoading}
            className="px-1 py-2 rounded-md bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {recommendLoading ? "Loading..." : "Recommend Now!"}
          </button>
        </div>

        {!user && <div>Please log in to see your recommendations.</div>}
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {recommendations && recommendations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Recommended for You
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recommendations.map((item: any, idx: number) => (
                <div
                  key={item.id ?? item.pizza_id ?? idx}
                  className="bg-white rounded-lg shadow-md p-3 text-sm"
                >
                  <h3 className="font-semibold text-gray-800">{item}</h3>
                  {item.description && (
                    <p className="text-gray-600 text-xs mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {recommendError && (
          <div className="text-red-500 mb-4">{recommendError}</div>
        )}
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
