import { useState, useEffect } from 'react';
import { Heart, Loader2, ShoppingCart, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../lib/supabase';

interface Favorite {
  id: string;
  item_id: string;
  item_name: string;
  item_price: number;
  created_at: string;
}

export default function FavoritesTab() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id: string) => {
    try {
      const { error } = await supabase.from('favorites').delete().eq('id', id);

      if (error) throw error;
      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleAddToCart = async (favorite: Favorite) => {
    await addToCart({
      id: favorite.item_id,
      name: favorite.item_name,
      price: favorite.item_price,
      image: '',
      description: '',
      category: '',
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorite Items</h2>

      {favorites.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Heart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No favorites yet</p>
          <p className="text-sm mt-2">Save items you love for quick ordering</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{favorite.item_name}</h3>
                  <p className="text-orange-500 font-bold mt-1">
                    ${favorite.item_price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveFavorite(favorite.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(favorite)}
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
