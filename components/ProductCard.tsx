
import React, { useState } from 'react';
import { Product, CartItem } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart({ ...product, quantity });
      setQuantity(1); // Reset quantity after adding
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
      <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-textPrimary mb-2">{product.name}</h3>
        <p className="text-textSecondary text-sm mb-3 h-20 overflow-y-auto">{product.description}</p>
        <p className="text-2xl font-bold text-primary mb-4 mt-auto">
          ₹{product.price.toFixed(2)} <span className="text-sm font-normal text-textSecondary">/ {product.unit}</span>
        </p>
        <div className="flex items-center space-x-3 mb-4">
          <label htmlFor={`quantity-${product.id}`} className="text-sm font-medium text-textSecondary">Quantity:</label>
          <input
            type="number"
            id={`quantity-${product.id}`}
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
            className="w-20 border border-gray-300 rounded-md p-2 text-center focus:ring-primary focus:border-primary"
          />
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
    