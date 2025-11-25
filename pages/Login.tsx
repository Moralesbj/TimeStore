import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { AlertCircle, Lock, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await login(email, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-dark-800 p-8 rounded-lg border border-white/10 shadow-2xl">
        <h2 className="text-2xl font-serif font-bold text-white mb-6 text-center">Bienvenido a TimeStore</h2>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full bg-dark-900 border border-white/10 rounded pl-10 pr-4 py-3 text-white focus:border-gold-500 focus:outline-none"
              />
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Contraseña</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-dark-900 border border-white/10 rounded pl-10 pr-4 py-3 text-white focus:border-gold-500 focus:outline-none"
              />
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded text-sm font-bold text-black bg-gold-500 hover:bg-gold-400 focus:outline-none transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="font-medium text-gold-400 hover:text-gold-300">
              Regístrate aquí
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500 border-t border-white/5 pt-4">
          <p>Admin Demo: admin@timestore.com / admin</p>
        </div>
      </div>
    </div>
  );
};

export default Login;