
import React from 'react';
import { Order } from '../types';
import OrderItemCard from '../components/OrderItemCard';
import { useNavigate } from 'react-router-dom';

interface OrdersPageProps {
  orders: Order[];
}

const OrdersPage: React.FC<OrdersPageProps> = ({ orders }) => {
  const navigate = useNavigate();
  const sortedOrders = [...orders].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-textPrimary mb-6 pb-2 border-b-2 border-primary">My Orders</h1>
      {sortedOrders.length === 0 ? (
        <div className="text-center py-10">
          <ClipboardDocumentListIcon className="hero-icon h-16 w-16 text-gray-400 mx-auto mb-4"/>
          <p className="text-xl text-textSecondary">You have no past orders.</p>
           <button 
            onClick={() => navigate('/')}
            className="mt-6 bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedOrders.map(order => (
            <div key={order.id} className="bg-surface p-6 rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-primary">Order ID: {order.id}</h2>
                  <p className="text-sm text-textSecondary">
                    Date: {new Date(order.orderDate).toLocaleDateString()} {new Date(order.orderDate).toLocaleTimeString()}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 text-left sm:text-right">
                   <p className="text-lg font-semibold text-textPrimary">Total: ₹{order.totalAmount.toFixed(2)}</p>
                   <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700' // Delivered
                    }`}>{order.status}</span>
                </div>
              </div>
              
              <h3 className="text-md font-medium text-textPrimary mb-2">Items:</h3>
              <div className="space-y-2">
                {order.items.map(item => (
                  <OrderItemCard key={`${order.id}-${item.id}`} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ClipboardDocumentListIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.172a48.648 48.648 0 00-4.048-.452c-1.471 0-2.896.368-4.185 1.037M14.25 9H18M15 12H18M15 15H18M15 18H18M3 4.5v15A2.25 2.25 0 005.25 21.75h9.642c.609 0 1.171-.224 1.606-.611L21.67 15.92a2.25 2.25 0 00.61-1.605v-3.668c0-.411-.08-.812-.232-1.183a2.25 2.25 0 00-.61-1.606L15.23 3.48a2.25 2.25 0 00-1.605-.61H5.25A2.25 2.25 0 003 4.5z" />
  </svg>
);


export default OrdersPage;
    