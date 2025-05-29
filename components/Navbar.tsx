
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole } from '../types';

interface NavbarProps {
  cartItemCount: number;
  userRole: UserRole;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount, userRole, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-surface shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors">
            THRUPTHY DAIRY
          </Link>
          <div className="flex items-center space-x-6">
            <NavLink to="/">Home</NavLink>
            {userRole === UserRole.CUSTOMER && <NavLink to="/orders">My Orders</NavLink>}
            {userRole === UserRole.ADMIN && <NavLink to="/admin">Admin Dashboard</NavLink>}
            <NavLink to="/support">Support</NavLink>
            <NavLink to="/cart">
              <div className="relative flex items-center">
                <ShoppingCartIcon className="hero-icon h-6 w-6 text-textPrimary group-hover:text-primary" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </NavLink>
            {userRole !== UserRole.NONE ? (
              <button
                onClick={handleLogoutClick}
                className="px-4 py-2 text-sm font-medium text-textPrimary bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link
    to={to}
    className="text-textPrimary hover:text-primary transition-colors font-medium group"
  >
    {children}
  </Link>
);


// SVG Icons (Heroicons) - In a real app, consider a library or separate SVG files.
const ShoppingCartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);


export default Navbar;
    