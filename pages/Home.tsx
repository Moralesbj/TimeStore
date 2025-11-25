import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Clock, Shield, Star, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  const { products } = useStore();
  const navigate = useNavigate();
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  const categories = [
    { name: 'Deportivo', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop', link: 'Sport' },
    { name: 'Lujo', image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop', link: 'Luxury' },
    { name: 'Clásico', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop', link: 'Classic' },
    { name: 'Inteligente', image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=1000&auto=format&fit=crop', link: 'Smart' },
  ];

  return (
    <div className="flex flex-col w-full">
      
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image with Zoom Effect */}
        <div className="absolute inset-0 overflow-hidden">
           <img 
            src="https://images.unsplash.com/photo-1548171915-e79a380a2a4b?q=80&w=2000&auto=format&fit=crop" 
            alt="Luxury Watch Mechanism" 
            className="w-full h-full object-cover object-center opacity-50 animate-pulse-slow scale-110"
            style={{ animationDuration: '20s' }}
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <p className="text-gold-400 tracking-[0.2em] uppercase text-sm mb-4 font-bold">Colección Exclusiva 2024</p>
            <h1 className="font-serif text-5xl md:text-8xl font-bold text-white mb-6 leading-tight">
              Más que tiempo,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-200 italic">Legado.</span>
            </h1>
            <p className="text-lg text-gray-300 mb-10 font-light leading-relaxed max-w-lg">
              Descubra la precisión de la ingeniería suiza fusionada con el diseño contemporáneo. Cada pieza cuenta una historia de excelencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                to="/catalog" 
                className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gold-400 transition-all text-sm text-center"
              >
                Ver Catálogo
              </Link>
              <button 
                onClick={() => {
                   const el = document.getElementById('categories');
                   el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-sm text-center"
              >
                Explorar Categorías
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Categories Grid */}
      <section id="categories" className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Nuestras Colecciones</h2>
            <div className="h-0.5 w-24 bg-gold-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[600px] md:h-[400px]">
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                className="relative group overflow-hidden h-full cursor-pointer border border-white/10"
                onClick={() => navigate('/catalog')} // Ideally pass filter via query param
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-gold-400 text-sm uppercase tracking-wider flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver Colección <ChevronRight className="w-4 h-4" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-dark-800 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-serif font-bold text-white mb-2">Relojes Destacados</h2>
              <p className="text-gray-400">Piezas seleccionadas por nuestros expertos.</p>
            </div>
            <Link to="/catalog" className="hidden md:flex text-gold-400 items-center gap-2 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
             <Link to="/catalog" className="inline-flex text-gold-400 items-center gap-2 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators (Minimal) */}
      <section className="py-20 bg-black text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-white/5 mb-6">
              <Clock className="w-8 h-8 text-gold-400" />
            </div>
            <h3 className="text-lg font-serif font-bold mb-2">Precisión Certificada</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Cada reloj es verificado por nuestros maestros relojeros antes del envío.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-white/5 mb-6">
              <Shield className="w-8 h-8 text-gold-400" />
            </div>
            <h3 className="text-lg font-serif font-bold mb-2">Garantía de 5 Años</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Cobertura completa internacional en maquinaria y defectos de fabricación.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-white/5 mb-6">
              <Star className="w-8 h-8 text-gold-400" />
            </div>
            <h3 className="text-lg font-serif font-bold mb-2">Servicio Concierge</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">Atención personalizada y asesoramiento experto disponible 24/7.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;