import React from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <div className="group relative flex flex-col">
      {/* Image Container */}
      <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-gray-800 relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2 justify-center">
           <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex-1 bg-white text-black py-3 px-4 text-xs font-bold uppercase tracking-wider hover:bg-gold-400 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Añadir
          </button>
          <Link
            to={`/product/${product.id}`}
            className="bg-dark-900/80 backdrop-blur text-white p-3 hover:bg-gold-500 hover:text-black transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      {/* Info */}
      <div className="mt-4 text-center group-hover:translate-y-[-5px] transition-transform duration-300">
        <p className="text-xs text-gold-500 uppercase tracking-widest mb-1">{product.brand}</p>
        <h3 className="text-lg font-serif font-medium text-white mb-1">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-400 font-light mb-1">{product.category}</p>
        <p className="text-base font-bold text-white">${product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;