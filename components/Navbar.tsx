import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Menu, X, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { cart, toggleCart, user, logout } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path ? 'text-gold-400' : 'text-gray-300 hover:text-white';

  return (
    <nav className="sticky top-0 z-40 w-full bg-dark-900/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-white tracking-wider">
                Time<span className="text-gold-400">Store</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className={`${isActive('/')} transition-colors px-3 py-2 rounded-md text-sm font-medium`}>Inicio</Link>
              <Link to="/catalog" className={`${isActive('/catalog')} transition-colors px-3 py-2 rounded-md text-sm font-medium`}>Catálogo</Link>
              {user?.isAdmin && (
                 <Link to="/admin" className={`${isActive('/admin')} transition-colors px-3 py-2 rounded-md text-sm font-medium text-gold-400`}>Admin Panel</Link>
              )}
            </div>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Hola, {user.name}</span>
                <button onClick={logout} title="Cerrar sesión">
                  <LogOut className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <User className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
              </Link>
            )}
            
            <button onClick={toggleCart} className="relative p-2 group">
              <ShoppingBag className="w-6 h-6 text-gray-300 group-hover:text-gold-400 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black transform translate-x-1/4 -translate-y-1/4 bg-gold-400 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-800 border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Inicio</Link>
            <Link to="/catalog" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Catálogo</Link>
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Cuenta</Link>
             <button onClick={() => { toggleCart(); setIsMobileMenuOpen(false); }} className="text-gray-300 hover:text-white w-full text-left px-3 py-2 rounded-md text-base font-medium">
              Carrito ({cartCount})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;