import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Truck, ShoppingCart, LogOut } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
    const { logout } = useStore();
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/sales', icon: ShoppingCart, label: 'Ventas' },
        { path: '/admin/products', icon: ShoppingBag, label: 'Productos' },
        { path: '/admin/clients', icon: Users, label: 'Clientes' },
        { path: '/admin/suppliers', icon: Truck, label: 'Proveedores' },
        { path: '/admin/purchases', icon: ShoppingBag, label: 'Compras' },
        { path: '/admin/users', icon: Users, label: 'Usuarios' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-dark-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-dark-800 border-r border-white/10 flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-serif text-gold-500 font-bold">TimeStore Admin</h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${isActive
                                    ? 'bg-gold-500 text-black font-medium'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-white/5 rounded transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-dark-800 border-b border-white/10 px-8 py-6">
                    <h1 className="text-2xl font-serif text-white font-bold">{title}</h1>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
