import { useState, useEffect } from 'react';
import { Package, Loader2, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

interface OrderItem {
  id: string;
  menu_item_id: string;
  item_name: string;
  item_price: number;
  quantity: number;
  special_instructions: string | null;
}

interface Order {
  id: string;
  total: number;
  status: string;
  payment_status: string;
  created_at: string;
  delivery_street: string | null;
  delivery_city: string | null;
  delivery_state: string | null;
  delivery_zip_code: string | null;
  delivery_address: string | null;
  order_items: OrderItem[];
}

export default function OrderHistoryTab() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          total,
          status,
          payment_status,
          created_at,
          delivery_street,
          delivery_city,
          delivery_state,
          delivery_zip_code,
          delivery_address,
          order_items (
            id,
            menu_item_id,
            item_name,
            item_price,
            quantity,
            special_instructions
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'delivered':
      case 'confirmed':
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_for_delivery':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAddress = (order: Order) => {
    if (order.delivery_street && order.delivery_city && order.delivery_state && order.delivery_zip_code) {
      return `${order.delivery_street}, ${order.delivery_city}, ${order.delivery_state} ${order.delivery_zip_code}`;
    }
    return order.delivery_address || 'No address provided';
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No orders yet</p>
          <p className="text-sm mt-2">Your order history will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-6 hover:border-orange-300 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status
                    ? order.status.charAt(0).toUpperCase() +
                      order.status.slice(1).replace(/_/g, ' ')
                    : 'Pending'}
                </span>
              </div>

              {(order.delivery_street || order.delivery_address) && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
                      <p className="text-sm text-gray-700">{formatAddress(order)}</p>
                    </div>
                  </div>
                </div>
              )}

              {order.order_items && order.order_items.length > 0 && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <button
                    onClick={() => toggleOrderExpansion(order.id)}
                    className="flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    {expandedOrders.has(order.id) ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Hide Items ({order.order_items.length})
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        View Items ({order.order_items.length})
                      </>
                    )}
                  </button>

                  {expandedOrders.has(order.id) && (
                    <div className="mt-4 space-y-3">
                      {order.order_items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-start p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.item_name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            {item.special_instructions && (
                              <p className="text-sm text-gray-500 italic mt-1">
                                Note: {item.special_instructions}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {formatAmount(item.item_price * item.quantity)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatAmount(item.item_price)} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between items-end mt-4">
                <div>
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <p className="font-medium capitalize">
                    {order.payment_status || 'Pending'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatAmount(order.total)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
