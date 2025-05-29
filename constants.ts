
import { Product } from './types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'P1001',
    name: 'Buffalo Milk',
    price: 80,
    unit: 'liter',
    imageUrl: 'assets/milk.jpeg', // Updated
    description: 'Fresh and creamy buffalo milk, rich in nutrients.'
  },
  {
    id: 'P1002',
    name: 'Cow Milk',
    price: 55,
    unit: 'liter',
    imageUrl: 'assets/milk.jpeg', // Updated
    description: 'Pure and wholesome cow milk, perfect for daily consumption.'
  },
  {
    id: 'P1003',
    name: 'Curd',
    price: 95,
    unit: 'kg',
    imageUrl: 'assets/curd.jpeg', // Updated
    description: 'Thick and delicious curd, made from fresh milk.'
  },
  {
    id: 'P1004',
    name: 'Cow Ghee',
    price: 2300,
    unit: 'kg',
    imageUrl: 'assets/ghee.jpeg', // Updated
    description: 'Aromatic and pure cow ghee, traditionally prepared.'
  },
  {
    id: 'P1005',
    name: 'Buffalo Ghee',
    price: 1000,
    unit: 'kg',
    imageUrl: 'assets/ghee.jpeg', // Updated
    description: 'Rich and flavorful buffalo ghee, ideal for cooking.'
  },
];

export const HELPLINE_NUMBER = '+91-9876543210';
export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'password123'; // In a real app, this would be hashed and secure
export const GEMINI_CHAT_MODEL = 'gemini-2.5-flash-preview-04-17';
export const GEMINI_SYSTEM_INSTRUCTION_CHAT = `You are a friendly and helpful customer support AI for THRUPTHY DAIRY PRODUCTS. 
You can answer questions about our products (Buffalo Milk, Cow Milk, Curd, Cow Ghee, Buffalo Ghee), their prices, online ordering, and general inquiries. 
Our products are:
- Buffalo Milk: Rs. 80 per liter
- Cow Milk: Rs. 55 per liter
- Curd: Rs. 95 per kg
- Cow Ghee: Rs. 2300 per kg
- Buffalo Ghee: Rs. 1000 per kg
Be polite, concise, and informative. If you don't know the answer to something very specific not related to Thrupthy Dairy, politely say you cannot help with that.
Our helpline number is ${HELPLINE_NUMBER}.
`;