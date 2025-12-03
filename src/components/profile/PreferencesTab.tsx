import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

interface Preferences {
  email_notifications: boolean;
  sms_notifications: boolean;
  marketing_emails: boolean;
  theme: string;
  language: string;
}

export default function PreferencesTab() {
  const { user, updatePassword } = useAuth();
  const [preferences, setPreferences] = useState<Preferences>({
    email_notifications: true,
    sms_notifications: false,
    marketing_emails: false,
    theme: 'light',
    language: 'en',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setPreferences({
          email_notifications: data.email_notifications ?? true,
          sms_notifications: data.sms_notifications ?? false,
          marketing_emails: data.marketing_emails ?? false,
          theme: data.theme ?? 'light',
          language: data.language ?? 'en',
        });
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase.from('user_preferences').upsert({
        id: user?.id,
        ...preferences,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      setMessage('Preferences saved successfully!');
    } catch (error) {
      console.error('Error saving preferences:', error);
      setMessage('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage('Password must be at least 6 characters');
      return;
    }

    setUpdatingPassword(true);

    try {
      const { error } = await updatePassword(passwordData.newPassword);

      if (error) throw error;

      setPasswordMessage('Password updated successfully!');
      setPasswordData({ newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error updating password:', error);
      setPasswordMessage('Failed to update password');
    } finally {
      setUpdatingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={preferences.email_notifications}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    email_notifications: e.target.checked,
                  })
                }
                className="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
              />
              <span className="text-gray-700">Email notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={preferences.sms_notifications}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    sms_notifications: e.target.checked,
                  })
                }
                className="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
              />
              <span className="text-gray-700">SMS notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={preferences.marketing_emails}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    marketing_emails: e.target.checked,
                  })
                }
                className="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
              />
              <span className="text-gray-700">Marketing emails</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Appearance</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={preferences.theme}
              onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Language</h3>
          <select
            value={preferences.language}
            onChange={(e) =>
              setPreferences({ ...preferences, language: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="it">Italiano</option>
          </select>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.includes('success')
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {message}
          </div>
        )}

        <button
          onClick={handleSavePreferences}
          disabled={saving}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {saving && <Loader2 className="w-5 h-5 animate-spin" />}
          {saving ? 'Saving...' : 'Save Preferences'}
        </button>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold mb-4">Change Password</h3>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter new password"
                minLength={6}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Confirm new password"
                minLength={6}
                required
              />
            </div>

            {passwordMessage && (
              <div
                className={`p-4 rounded-lg ${
                  passwordMessage.includes('success')
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {passwordMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={updatingPassword}
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {updatingPassword && <Loader2 className="w-5 h-5 animate-spin" />}
              {updatingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
