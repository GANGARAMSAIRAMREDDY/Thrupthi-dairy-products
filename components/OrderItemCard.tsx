
import React from 'react';
import { OrderItem as OrderItemType } from '../types'; // Renamed to avoid conflict

interface OrderItemCardProps {
  item: OrderItemType;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ item }) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md mb-2">
      <div className="flex items-center space-x-3">
        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
        <div>
          <h5 className="text-sm font-medium text-textPrimary">{item.name}</h5>
          <p className="text-xs text-textSecondary">₹{item.price.toFixed(2)} / {item.unit}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-textPrimary">Qty: {item.quantity}</p>
        <p className="text-sm font-semibold text-textPrimary">Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderItemCard;
    