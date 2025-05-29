
import { CartItem } from '../types';

const CART_STORAGE_KEY = 'thrupthyDairyCart';

export const getStoredCart = (): CartItem[] => {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
};

export const storeCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const clearStoredCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
};
    