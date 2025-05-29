
import { Order } from '../types';

const ORDERS_STORAGE_KEY = 'thrupthyDairyOrders';

export const getAllOrders = (): Order[] => {
  const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
  return storedOrders ? JSON.parse(storedOrders) : [];
};

export const getOrdersByCustomerId = (customerId: string): Order[] => {
  const allOrders = getAllOrders();
  // For guest users, customerId might be 'guest'.
  // In a real app, this would involve more robust user identification.
  return allOrders.filter(order => order.customerId === customerId);
};

export const addOrder = (order: Order): void => {
  const allOrders = getAllOrders();
  allOrders.push(order);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(allOrders));
};

export const updateOrderStatus = (orderId: string, status: Order['status']): boolean => {
  const allOrders = getAllOrders();
  const orderIndex = allOrders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    allOrders[orderIndex].status = status;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(allOrders));
    return true;
  }
  return false;
};

// Optional: A function to clear all orders (for testing/reset)
export const clearAllOrders = (): void => {
  localStorage.removeItem(ORDERS_STORAGE_KEY);
};
    