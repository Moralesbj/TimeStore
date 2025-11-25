import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
             <span className="font-serif text-2xl font-bold text-white tracking-wider block mb-4">
                Time<span className="text-gold-400">Store</span>
            </span>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Especialistas en relojería de alta gama. Ofrecemos una selección curada de las mejores marcas mundiales, combinando tradición y modernidad para quienes valoran cada segundo.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm">Explorar</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-gold-400">Colección 2024</a></li>
              <li><a href="#" className="hover:text-gold-400">Relojes Suizos</a></li>
              <li><a href="#" className="hover:text-gold-400">Ediciones Limitadas</a></li>
              <li><a href="#" className="hover:text-gold-400">Outlet</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-4 text-sm">Contacto</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Calle Lujo 123, Madrid</li>
              <li>soporte@timestore.com</li>
              <li>+34 900 123 456</li>
              
              <li className="flex gap-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Twitter className="w-5 h-5" /></a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">© 2024 TimeStore. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300">Privacidad</a>
            <a href="#" className="hover:text-gray-300">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;