import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { UserPlus, Mail, Lock, User as UserIcon, AlertCircle, CheckCircle } from 'lucide-react';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { register } = useStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        const result = await register({ name, email, password });

        if (result.success) {
            setSuccess(result.message || 'Registro exitoso.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } else {
            setError(result.message || 'Error al registrar.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-dark-800 p-8 rounded-lg border border-white/10 shadow-2xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-serif font-bold text-white">Crear Cuenta</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Únete a TimeStore para acceder a nuestro catálogo exclusivo.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4" /> {success}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre Completo</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-2 pl-10 border border-white/10 bg-dark-900 text-white rounded focus:outline-none focus:border-gold-500 focus:z-10 sm:text-sm"
                                    placeholder="Juan Pérez"
                                />
                                <UserIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-2 pl-10 border border-white/10 bg-dark-900 text-white rounded focus:outline-none focus:border-gold-500 focus:z-10 sm:text-sm"
                                    placeholder="correo@ejemplo.com"
                                />
                                <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-2 pl-10 border border-white/10 bg-dark-900 text-white rounded focus:outline-none focus:border-gold-500 focus:z-10 sm:text-sm"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Confirmar Contraseña</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-2 pl-10 border border-white/10 bg-dark-900 text-white rounded focus:outline-none focus:border-gold-500 focus:z-10 sm:text-sm"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gold-500 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <UserPlus className="h-5 w-5 text-black/50 group-hover:text-black" aria-hidden="true" />
                            </span>
                            Registrarse
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-400">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="font-medium text-gold-400 hover:text-gold-300">
                            Inicia Sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
