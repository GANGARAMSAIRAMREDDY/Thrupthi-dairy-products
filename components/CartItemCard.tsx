
import React from 'react';
import { CartItem } from '../types';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity);
    } else if (newQuantity === 0) {
       onUpdateQuantity(item.id, 0); // This will filter out the item in App.tsx
    }
  };

  return (
    <div className="flex items-center justify-between bg-surface p-4 rounded-lg shadow mb-4">
      <div className="flex items-center space-x-4">
        <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
        <div>
          <h4 className="text-lg font-semibold text-textPrimary">{item.name}</h4>
          <p className="text-textSecondary">₹{item.price.toFixed(2)} / {item.unit}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
           <label htmlFor={`cart-quantity-${item.id}`} className="sr-only">Quantity</label>
          <input
            type="number"
            id={`cart-quantity-${item.id}`}
            min="0" // Allow 0 to remove
            value={item.quantity}
            onChange={handleQuantityChange}
            className="w-16 border border-gray-300 rounded-md p-2 text-center focus:ring-primary focus:border-primary"
          />
        </div>
        <p className="text-md font-semibold text-textPrimary w-24 text-right">
          ₹{(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemoveItem(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
          title="Remove item"
        >
          <TrashIcon className="hero-icon h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c.342.052.682.107 1.022.166m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);


export default CartItemCard;
    