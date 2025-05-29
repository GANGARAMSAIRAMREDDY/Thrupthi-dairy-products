
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, UserRole } from '../types';
import CartItemCard from '../components/CartItemCard';
import { addOrder } from '../services/orderService';
import Modal from '../components/Modal'; // Assuming Modal component exists

interface CartPageProps {
  cart: CartItem[];
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  userRole: UserRole;
  updateOrders: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, updateCartItemQuantity, removeFromCart, clearCart, userRole, updateOrders }) => {
  const navigate = useNavigate();
  const [isOrderPlacedModalOpen, setIsOrderPlacedModalOpen] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (userRole === UserRole.NONE) {
      navigate('/login?redirect=/cart'); // Redirect to login if not logged in
      return;
    }
    if (cart.length === 0) return;

    const newOrder = {
      id: `ORD-${Date.now()}`,
      customerId: 'guest', // Replace with actual customerId if available
      items: cart.map(item => ({ ...item })), // Create deep copy of items
      totalAmount,
      orderDate: new Date().toISOString(),
      status: 'Pending' as 'Pending',
    };
    addOrder(newOrder);
    clearCart();
    updateOrders(); // Notify App.tsx to refresh orders list
    setIsOrderPlacedModalOpen(true);
  };

  const closeOrderPlacedModalAndNavigate = () => {
    setIsOrderPlacedModalOpen(false);
    navigate('/orders');
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-textPrimary mb-6 pb-2 border-b-2 border-primary">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <ShoppingCartIcon className="hero-icon h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-textSecondary">Your cart is empty.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-6 bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map(item => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={updateCartItemQuantity}
                onRemoveItem={removeFromCart}
              />
            ))}
          </div>
          <div className="mt-8 p-6 bg-surface rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-textPrimary">Order Summary</h2>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-textSecondary">Subtotal:</p>
              <p className="text-textPrimary font-medium">₹{totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-textSecondary">Shipping:</p>
              <p className="text-textPrimary font-medium">Free</p>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between items-center font-bold text-xl mb-6">
              <p className="text-textPrimary">Total Amount:</p>
              <p className="text-primary">₹{totalAmount.toFixed(2)}</p>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-secondary hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-md transition-colors text-lg disabled:opacity-50"
              disabled={cart.length === 0}
            >
              {userRole === UserRole.NONE ? 'Login to Place Order' : 'Place Order'}
            </button>
             {userRole === UserRole.NONE && (
                <p className="text-sm text-center text-textSecondary mt-2">
                    You need to be logged in to place an order.
                </p>
            )}
          </div>
        </>
      )}
      <Modal isOpen={isOrderPlacedModalOpen} onClose={closeOrderPlacedModalAndNavigate} title="Order Placed Successfully!">
        <div className="text-center">
          <CheckCircleIcon className="hero-icon h-16 w-16 text-secondary mx-auto mb-4" />
          <p className="text-textPrimary mb-4">Your order has been placed successfully and is now pending confirmation.</p>
          <p className="text-textSecondary mb-6">You can view your order details in the "My Orders" section.</p>
          <button
            onClick={closeOrderPlacedModalAndNavigate}
            className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            View My Orders
          </button>
        </div>
      </Modal>
    </div>
  );
};


const ShoppingCartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default CartPage;
    