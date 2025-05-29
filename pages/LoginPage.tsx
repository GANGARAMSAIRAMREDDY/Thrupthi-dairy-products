
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserRole } from '../types';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../constants';
import Modal from '../components/Modal';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';


  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin(UserRole.ADMIN);
      navigate(redirectPath === '/login' ? '/admin' : redirectPath, { replace: true });
    } else {
      setError('Invalid admin credentials.');
    }
  };

  const handleCustomerLogin = () => {
    onLogin(UserRole.CUSTOMER);
    navigate(redirectPath === '/login' ? '/' : redirectPath, { replace: true });
  };
  
  const openGuestModal = () => {
    setIsGuestModalOpen(true);
  }

  const confirmGuestLogin = () => {
    setIsGuestModalOpen(false);
    handleCustomerLogin();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="p-8 bg-surface shadow-2xl rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary text-center mb-8">Login</h1>
        
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-textPrimary mb-4">Admin Login</h2>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-textSecondary mb-1">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-textSecondary mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
            >
              Login as Admin
            </button>
          </form>
        </section>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface text-textSecondary">OR</span>
          </div>
        </div>
        
        <section>
          <h2 className="text-xl font-semibold text-textPrimary mb-4">Customer Access</h2>
          <button
            onClick={openGuestModal}
            className="w-full bg-secondary hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
          >
            Continue as Guest Customer
          </button>
           <p className="text-xs text-center text-textSecondary mt-2">
            (Guest access allows browsing, adding to cart, and placing orders. Order history is saved locally.)
          </p>
        </section>
      </div>
      <Modal isOpen={isGuestModalOpen} onClose={() => setIsGuestModalOpen(false)} title="Continue as Guest">
        <p className="text-textPrimary mb-4">
          By continuing as a guest, your order history and cart items will be saved on this device only.
        </p>
        <p className="text-textSecondary mb-6 text-sm">
          For a full experience including order tracking across devices (feature not yet implemented), please create an account (option not yet available).
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsGuestModalOpen(false)}
            className="px-4 py-2 text-sm font-medium text-textPrimary bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmGuestLogin}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-600 rounded-md transition-colors"
          >
            Proceed as Guest
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginPage;
    