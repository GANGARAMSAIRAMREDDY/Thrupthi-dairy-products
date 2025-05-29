
export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  imageUrl: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string; // 'guest' or a user ID
  items: OrderItem[];
  totalAmount: number;
  orderDate: string; // ISO string
  status: 'Pending' | 'Confirmed' | 'Delivered'; // Simplified status
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  NONE = 'NONE'
}
    