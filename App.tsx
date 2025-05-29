
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartItem, UserRole, Order } from './types';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import SupportPage from './pages/SupportPage';
import LoginPage from './pages/LoginPage';
import { getStoredUserRole, storeUserRole, clearUserRole } from './services/authService';
import { getStoredCart, storeCart } from './services/cartService';
import { getOrdersByCustomerId, getAllOrders } from './services/orderService';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(getStoredCart());
  const [userRole, setUserRole] = useState<UserRole>(getStoredUserRole());
  const [orders, setOrders] = useState<Order[]>([]); // For customer or admin

  useEffect(() => {
    storeCart(cart);
  }, [cart]);

  useEffect(() => {
    storeUserRole(userRole);
    // Fetch orders based on role when role changes
    if (userRole === UserRole.CUSTOMER) {
      // Assuming 'guest' for simplicity or a real customerId if implemented
      setOrders(getOrdersByCustomerId('guest')); 
    } else if (userRole === UserRole.ADMIN) {
      setOrders(getAllOrders());
    } else {
      setOrders([]);
    }
  }, [userRole]);
  
  const updateOrders = useCallback(() => {
    if (userRole === UserRole.CUSTOMER) {
      setOrders(getOrdersByCustomerId('guest'));
    } else if (userRole === UserRole.ADMIN) {
      setOrders(getAllOrders());
    }
  }, [userRole]);


  const addToCart = (product: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      }
      return [...prevCart, product];
    });
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    setCart(prevCart =>
      prevCart
        .map(item => (item.id === productId ? { ...item, quantity } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    clearUserRole();
    setUserRole(UserRole.NONE);
    setCart([]); // Optionally clear cart on logout
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} userRole={userRole} onLogout={handleLogout} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} updateCartItemQuantity={updateCartItemQuantity} removeFromCart={removeFromCart} clearCart={clearCart} userRole={userRole} updateOrders={updateOrders} />} />
            <Route path="/orders" element={userRole === UserRole.CUSTOMER ? <OrdersPage orders={orders} /> : <Navigate to="/login" replace />} />
            <Route path="/admin" element={userRole === UserRole.ADMIN ? <AdminPage orders={orders} updateOrders={updateOrders} /> : <Navigate to="/login" replace />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; {new Date().getFullYear()} Thrupthy Dairy Products. All rights reserved.</p>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
    