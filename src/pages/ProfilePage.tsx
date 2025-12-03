import { useState } from 'react';
import { User, MapPin, Heart, Package, Settings } from 'lucide-react';
import ProfileInfo from '../components/profile/ProfileInfo';
import AddressesTab from '../components/profile/AddressesTab';
import OrderHistoryTab from '../components/profile/OrderHistoryTab';
import FavoritesTab from '../components/profile/FavoritesTab';
import PreferencesTab from '../components/profile/PreferencesTab';

type TabType = 'profile' | 'addresses' | 'orders' | 'favorites' | 'preferences';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'addresses' as TabType, label: 'Addresses', icon: MapPin },
    { id: 'orders' as TabType, label: 'Orders', icon: Package },
    { id: 'favorites' as TabType, label: 'Favorites', icon: Heart },
    { id: 'preferences' as TabType, label: 'Preferences', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                      ${
                        activeTab === tab.id
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && <ProfileInfo />}
            {activeTab === 'addresses' && <AddressesTab />}
            {activeTab === 'orders' && <OrderHistoryTab />}
            {activeTab === 'favorites' && <FavoritesTab />}
            {activeTab === 'preferences' && <PreferencesTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
