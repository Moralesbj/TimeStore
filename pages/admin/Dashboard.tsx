import React from 'react';
import { useStore } from '../../context/StoreContext';
import AdminLayout from '../../components/AdminLayout';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const { products, sales, clients } = useStore();

    const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
    const totalProducts = products.length;
    const totalClients = clients.length;

    const stats = [
        { label: 'Ventas Totales', value: `$${totalSales.toLocaleString()}`, icon: DollarSign, color: 'text-green-500' },
        { label: 'Productos', value: totalProducts, icon: ShoppingBag, color: 'text-blue-500' },
        { label: 'Clientes', value: totalClients, icon: Users, color: 'text-purple-500' },
        { label: 'Pedidos', value: sales.length, icon: TrendingUp, color: 'text-gold-500' },
    ];

    return (
        <AdminLayout title="Dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-dark-800 p-6 rounded-lg border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-full bg-white/5 ${stat.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                            <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
                            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-dark-800 p-6 rounded-lg border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">Ventas Recientes</h3>
                    {sales.length === 0 ? (
                        <p className="text-gray-500">No hay ventas registradas.</p>
                    ) : (
                        <div className="space-y-4">
                            {sales.slice(-5).reverse().map(sale => (
                                <div key={sale.id} className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <div>
                                        <p className="text-white font-medium">{sale.clientName}</p>
                                        <p className="text-sm text-gray-400">{new Date(sale.date).toLocaleDateString()}</p>
                                    </div>
                                    <span className="text-gold-500 font-bold">${sale.total.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-dark-800 p-6 rounded-lg border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">Productos con Bajo Stock</h3>
                    <div className="space-y-4">
                        {products.filter(p => (p.stock || 0) < 5).map(p => (
                            <div key={p.id} className="flex justify-between items-center border-b border-white/5 pb-2">
                                <div>
                                    <p className="text-white font-medium">{p.name}</p>
                                    <p className="text-sm text-gray-400">{p.brand}</p>
                                </div>
                                <span className="text-red-400 font-bold">{p.stock} unid.</span>
                            </div>
                        ))}
                        {products.filter(p => (p.stock || 0) < 5).length === 0 && (
                            <p className="text-gray-500">Todos los productos tienen buen stock.</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
