
import React, { useState } from 'react';
import { Order } from '../types';
import OrderItemCard from '../components/OrderItemCard';
import { updateOrderStatus } from '../services/orderService';

interface AdminPageProps {
  orders: Order[];
  updateOrders: () => void; // Callback to refresh orders in App.tsx
}

const AdminPage: React.FC<AdminPageProps> = ({ orders, updateOrders }) => {
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Confirmed' | 'Delivered'>('All');

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    updateOrders(); // Refresh the orders list
  };
  
  const sortedOrders = [...orders].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

  const filteredOrders = sortedOrders.filter(order => 
    filterStatus === 'All' || order.status === filterStatus
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-textPrimary mb-6 pb-2 border-b-2 border-primary">Admin Dashboard - All Orders</h1>
      
      <div className="mb-6">
        <label htmlFor="statusFilter" className="mr-2 font-medium text-textPrimary">Filter by status:</label>
        <select 
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as Order['status'] | 'All')}
          className="p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-textSecondary text-center py-10">
            {filterStatus === 'All' ? 'No orders received yet.' : `No orders with status "${filterStatus}".`}
        </p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-surface p-6 rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 pb-4 border-b border-gray-200">
                <div>
                    <h2 className="text-xl font-semibold text-primary">Order ID: {order.id}</h2>
                    <p className="text-sm text-textSecondary">Customer ID: {order.customerId}</p>
                    <p className="text-sm text-textSecondary">
                        Date: {new Date(order.orderDate).toLocaleDateString()} {new Date(order.orderDate).toLocaleTimeString()}
                    </p>
                </div>
                <div className="mt-2 sm:mt-0 text-left sm:text-right">
                    <p className="text-lg font-semibold text-textPrimary">Total: ₹{order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-md font-medium text-textPrimary mb-2">Items:</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {order.items.map(item => (
                    <OrderItemCard key={`${order.id}-${item.id}`} item={item} />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <label htmlFor={`status-${order.id}`} className="text-sm font-medium text-textPrimary">Order Status:</label>
                <select
                  id={`status-${order.id}`}
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                  className={`p-2 border rounded-md text-sm focus:ring-primary focus:border-primary ${
                    order.status === 'Pending' ? 'bg-yellow-100 border-yellow-300 text-yellow-700' :
                    order.status === 'Confirmed' ? 'bg-blue-100 border-blue-300 text-blue-700' :
                    'bg-green-100 border-green-300 text-green-700'
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
    