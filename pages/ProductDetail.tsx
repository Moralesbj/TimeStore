import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, Check, ShoppingBag } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white">
        Producto no encontrado.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-dark-800 p-8 flex items-center justify-center border border-white/5">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-w-full h-auto shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div>
          <h2 className="text-sm text-gold-400 font-bold tracking-widest uppercase mb-2">
            {product.brand} — {product.category}
          </h2>
          <h1 className="text-4xl font-serif font-bold text-white mb-4">{product.name}</h1>
          <p className="text-3xl text-white font-light mb-6">${product.price.toLocaleString()}</p>

          <div className="prose prose-invert mb-8">
            <p className="text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-white font-bold mb-3">Especificaciones:</h3>
            <ul className="grid grid-cols-2 gap-2">
              {product.specs.map((spec, idx) => (
                <li key={idx} className="flex items-center text-gray-400 text-sm">
                  <Check className="w-4 h-4 text-gold-500 mr-2" /> {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/10 pt-8">
            <button
              onClick={() => addToCart(product)}
              className="w-full md:w-auto bg-gold-500 text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-gold-400 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Añadir al carrito
            </button>
            <p className="text-xs text-gray-500 mt-4 text-center md:text-left">
              Envío gratuito asegurado • Devolución en 30 días
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;