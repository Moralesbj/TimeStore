import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { ProductCategory } from '../types';
import { Search, SlidersHorizontal } from 'lucide-react';

const Catalog: React.FC = () => {
  const { products } = useStore();
  
  // Filter States
  const [category, setCategory] = useState<ProductCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<number>(30000);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = p.price <= priceRange;
      
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [products, category, searchTerm, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="text-gold-400" />
            <h2 className="text-xl font-serif font-bold text-white">Filtros</h2>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar reloj..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded px-4 py-2 pl-10 text-white focus:border-gold-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categoría</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white">
                <input 
                  type="radio" 
                  name="category" 
                  checked={category === 'All'} 
                  onChange={() => setCategory('All')}
                  className="accent-gold-500"
                />
                Todos
              </label>
              {Object.values(ProductCategory).map(cat => (
                <label key={cat} className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={category === cat} 
                    onChange={() => setCategory(cat)}
                    className="accent-gold-500"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Precio Máximo</h3>
            <input 
              type="range" 
              min="0" 
              max="30000" 
              step="500" 
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-gold-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>$0</span>
              <span>${priceRange.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-serif font-bold text-white">
              {category === 'All' ? 'Catálogo Completo' : category}
            </h1>
            <span className="text-gray-400 text-sm">{filteredProducts.length} resultados</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-dark-800 border border-white/5 rounded">
              <p className="text-gray-400 text-lg">No se encontraron relojes con estos filtros.</p>
              <button 
                onClick={() => {setCategory('All'); setSearchTerm(''); setPriceRange(30000)}}
                className="mt-4 text-gold-400 hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;