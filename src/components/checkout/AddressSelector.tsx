import { useState, useEffect } from 'react';
import { MapPin, Plus, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  is_default: boolean;
}

interface SelectedAddress {
  addressId?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  saveToProfile?: boolean;
}

interface AddressSelectorProps {
  onAddressSelect: (address: SelectedAddress | null) => void;
  selectedAddress: SelectedAddress | null;
}

export default function AddressSelector({ onAddressSelect, selectedAddress }: AddressSelectorProps) {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    saveToProfile: true,
  });

  useEffect(() => {
    if (user) {
      loadAddresses();
    }
  }, [user]);

  const loadAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', user?.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;

      const loadedAddresses = data || [];
      setAddresses(loadedAddresses);

      if (loadedAddresses.length > 0 && !selectedAddress) {
        const defaultAddress = loadedAddresses.find(addr => addr.is_default) || loadedAddresses[0];
        onAddressSelect({
          addressId: defaultAddress.id,
          street: defaultAddress.street,
          city: defaultAddress.city,
          state: defaultAddress.state,
          zipCode: defaultAddress.zip_code,
        });
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSavedAddress = (address: Address) => {
    setShowNewAddressForm(false);
    onAddressSelect({
      addressId: address.id,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zip_code,
    });
  };

  const handleNewAddressChange = (field: string, value: string | boolean) => {
    const updated = { ...newAddress, [field]: value };
    setNewAddress(updated);

    if (field !== 'saveToProfile' && updated.street && updated.city && updated.state && updated.zipCode) {
      onAddressSelect({
        street: updated.street,
        city: updated.city,
        state: updated.state,
        zipCode: updated.zipCode,
        saveToProfile: updated.saveToProfile,
      });
    }
  };

  const handleShowNewAddressForm = () => {
    setShowNewAddressForm(true);
    onAddressSelect(null);
    setNewAddress({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      saveToProfile: true,
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="h-24 bg-gray-100 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>

      {addresses.length > 0 && (
        <div className="space-y-3 mb-4">
          {addresses.map((address) => (
            <button
              key={address.id}
              onClick={() => handleSelectSavedAddress(address)}
              className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                selectedAddress?.addressId === address.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <MapPin className={`w-5 h-5 mt-0.5 ${
                    selectedAddress?.addressId === address.id ? 'text-orange-500' : 'text-gray-400'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{address.label}</span>
                      {address.is_default && (
                        <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {address.street}<br />
                      {address.city}, {address.state} {address.zip_code}
                    </p>
                  </div>
                </div>
                {selectedAddress?.addressId === address.id && (
                  <Check className="w-5 h-5 text-orange-500" />
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {!showNewAddressForm ? (
        <button
          onClick={handleShowNewAddressForm}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Address</span>
        </button>
      ) : (
        <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">New Delivery Address</h4>
            <button
              onClick={() => {
                setShowNewAddressForm(false);
                if (addresses.length > 0) {
                  const defaultAddress = addresses.find(addr => addr.is_default) || addresses[0];
                  handleSelectSavedAddress(defaultAddress);
                }
              }}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                value={newAddress.street}
                onChange={(e) => handleNewAddressChange('street', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="123 Main St"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => handleNewAddressChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="City"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  value={newAddress.state}
                  onChange={(e) => handleNewAddressChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="State"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code *
              </label>
              <input
                type="text"
                value={newAddress.zipCode}
                onChange={(e) => handleNewAddressChange('zipCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="12345"
                required
              />
            </div>

            <div className="flex items-center pt-2">
              <input
                type="checkbox"
                id="saveToProfile"
                checked={newAddress.saveToProfile}
                onChange={(e) => handleNewAddressChange('saveToProfile', e.target.checked)}
                className="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
              />
              <label htmlFor="saveToProfile" className="ml-2 text-sm text-gray-700">
                Save this address to my profile for future orders
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
