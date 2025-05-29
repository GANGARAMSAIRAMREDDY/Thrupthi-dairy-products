
import { UserRole } from '../types';

const USER_ROLE_STORAGE_KEY = 'thrupthyDairyUserRole';

export const getStoredUserRole = (): UserRole => {
  const storedRole = localStorage.getItem(USER_ROLE_STORAGE_KEY);
  if (storedRole && Object.values(UserRole).includes(storedRole as UserRole)) {
    return storedRole as UserRole;
  }
  return UserRole.NONE; // Default to no role
};

export const storeUserRole = (role: UserRole): void => {
  localStorage.setItem(USER_ROLE_STORAGE_KEY, role);
};

export const clearUserRole = (): void => {
  localStorage.removeItem(USER_ROLE_STORAGE_KEY);
};
    