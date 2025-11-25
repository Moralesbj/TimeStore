import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Search, Eye } from 'lucide-react';
import { Sale, SaleItem } from '../../types';

const AdminSales: React.FC = () => {
    const { sales, addSale, products, clients } = useStore();
    const [showModal, setShowModal] = useState(false);

    // New Sale Form State
    const [newSale, setNewSale] = useState<Partial<Sale>>({
        clientName: '',
        items: [],
        status: 'completed'
    });
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleAddItem = () => {
        const product = products.find(p => p.id === selectedProduct);
        if (product) {
            const newItem: SaleItem = {
                productId: product.id,
                productName: product.name,
                quantity: quantity,
                price: product.price
            };
            setNewSale(prev => ({
                ...prev,
                items: [...(prev.items || []), newItem]
            }));
            setSelectedProduct('');
            setQuantity(1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const total = (newSale.items || []).reduce((acc, item) => acc + (item.price * item.quantity), 0);

        addSale({
            id: Date.now().toString(),
            date: new Date().toISOString(),
            clientId: clients.find(c => c.name === newSale.clientName)?.id, // Try to link if name matches
            clientName: newSale.clientName || 'Cliente General',
            items: newSale.items || [],
            total,
            status: 'completed'
        });
        setShowModal(false);
        setNewSale({ clientName: '', items: [], status: 'completed' });
    };

    return (
        <AdminLayout title="Gestión de Ventas">
            <div className="bg-dark-800 rounded-lg border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar venta..."
                            className="bg-dark-900 border border-white/10 rounded pl-10 pr-4 py-2 text-white focus:outline-none focus:border-gold-500"
                        />
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gold-500 text-black font-bold px-4 py-2 rounded flex items-center gap-2 hover:bg-gold-400"
                    >
                        <Plus className="w-5 h-5" /> Nueva Venta
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400">
                        <thead className="text-xs uppercase bg-dark-900 text-gray-200">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Cliente</th>
                                <th className="px-6 py-3">Fecha</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Estado</th>
                                <th className="px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {sales.map(sale => (
                                <tr key={sale.id} className="hover:bg-white/5">
                                    <td className="px-6 py-4 font-mono text-sm">{sale.id.slice(-6)}</td>
                                    <td className="px-6 py-4 font-medium text-white">{sale.clientName}</td>
                                    <td className="px-6 py-4">{new Date(sale.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-gold-500 font-bold">${sale.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                                            {sale.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-400 hover:text-blue-300">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* New Sale Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-dark-800 rounded-lg border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Registrar Nueva Venta</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Cliente</label>
                                <input
                                    type="text"
                                    required
                                    value={newSale.clientName}
                                    onChange={e => setNewSale({ ...newSale, clientName: e.target.value })}
                                    className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                                    placeholder="Nombre del cliente"
                                />
                            </div>

                            <div className="bg-dark-900 p-4 rounded border border-white/5">
                                <h3 className="text-sm font-bold text-white mb-3">Agregar Productos</h3>
                                <div className="flex gap-2 mb-4">
                                    <select
                                        value={selectedProduct}
                                        onChange={e => setSelectedProduct(e.target.value)}
                                        className="flex-1 bg-dark-800 border border-white/10 rounded p-2 text-white"
                                    >
                                        <option value="">Seleccionar producto...</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.id}>{p.name} - ${p.price}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={e => setQuantity(Number(e.target.value))}
                                        className="w-20 bg-dark-800 border border-white/10 rounded p-2 text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddItem}
                                        disabled={!selectedProduct}
                                        className="bg-blue-600 text-white px-4 rounded hover:bg-blue-500 disabled:opacity-50"
                                    >
                                        Agregar
                                    </button>
                                </div>

                                {/* Items List */}
                                <div className="space-y-2">
                                    {newSale.items?.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-dark-800 p-2 rounded">
                                            <span className="text-white">{item.productName} x {item.quantity}</span>
                                            <span className="text-gold-500">${(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 text-right text-xl font-bold text-white">
                                    Total: ${(newSale.items || []).reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString()}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gold-500 text-black font-bold px-6 py-2 rounded hover:bg-gold-400"
                                >
                                    Completar Venta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminSales;
