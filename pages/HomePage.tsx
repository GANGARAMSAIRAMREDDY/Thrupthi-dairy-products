
import React from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS_DATA } from '../constants';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  addToCart: (item: CartItem) => void;
}

const HomePage: React.FC<HomePageProps> = ({ addToCart }) => {
  const products: Product[] = PRODUCTS_DATA;

  return (
    <div className="space-y-8">
      <header className="text-center py-8 bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to Thrupthy Dairy Products</h1>
        <p className="text-lg text-blue-100">Freshness Delivered to Your Doorstep!</p>
      </header>
      
      <section>
        <h2 className="text-3xl font-semibold text-textPrimary mb-6 pb-2 border-b-2 border-primary">Our Products</h2>
        {products.length === 0 ? (
          <p className="text-textSecondary">No products available at the moment. Please check back later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
    