import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Search, Eye } from 'lucide-react';
import { Purchase, PurchaseItem } from '../../types';

const AdminPurchases: React.FC = () => {
    const { purchases, addPurchase, products, suppliers } = useStore();
    const [showModal, setShowModal] = useState(false);

    // New Purchase Form State
    const [newPurchase, setNewPurchase] = useState<Partial<Purchase>>({
        supplierName: '',
        items: [],
        status: 'received'
    });
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [cost, setCost] = useState(0);

    const handleAddItem = () => {
        const product = products.find(p => p.id === selectedProduct);
        if (product) {
            const newItem: PurchaseItem = {
                productId: product.id,
                productName: product.name,
                quantity: quantity,
                cost: cost
            };
            setNewPurchase(prev => ({
                ...prev,
                items: [...(prev.items || []), newItem]
            }));
            setSelectedProduct('');
            setQuantity(1);
            setCost(0);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const total = (newPurchase.items || []).reduce((acc, item) => acc + (item.cost * item.quantity), 0);

        addPurchase({
            id: Date.now().toString(),
            date: new Date().toISOString(),
            supplierId: suppliers.find(s => s.name === newPurchase.supplierName)?.id || 'unknown',
            supplierName: newPurchase.supplierName || 'Proveedor General',
            items: newPurchase.items || [],
            total,
            status: 'received'
        });
        setShowModal(false);
        setNewPurchase({ supplierName: '', items: [], status: 'received' });
    };

    return (
        <AdminLayout title="Gestión de Compras">
            <div className="bg-dark-800 rounded-lg border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar compra..."
                            className="bg-dark-900 border border-white/10 rounded pl-10 pr-4 py-2 text-white focus:outline-none focus:border-gold-500"
                        />
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gold-500 text-black font-bold px-4 py-2 rounded flex items-center gap-2 hover:bg-gold-400"
                    >
                        <Plus className="w-5 h-5" /> Nueva Compra
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400">
                        <thead className="text-xs uppercase bg-dark-900 text-gray-200">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Proveedor</th>
                                <th className="px-6 py-3">Fecha</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Estado</th>
                                <th className="px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {purchases.map(purchase => (
                                <tr key={purchase.id} className="hover:bg-white/5">
                                    <td className="px-6 py-4 font-mono text-sm">{purchase.id.slice(-6)}</td>
                                    <td className="px-6 py-4 font-medium text-white">{purchase.supplierName}</td>
                                    <td className="px-6 py-4">{new Date(purchase.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-gold-500 font-bold">${purchase.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                            {purchase.status}
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

            {/* New Purchase Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-dark-800 rounded-lg border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Registrar Nueva Compra</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Proveedor</label>
                                <select
                                    required
                                    value={newPurchase.supplierName}
                                    onChange={e => setNewPurchase({ ...newPurchase, supplierName: e.target.value })}
                                    className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                                >
                                    <option value="">Seleccionar proveedor...</option>
                                    {suppliers.map(s => (
                                        <option key={s.id} value={s.name}>{s.name}</option>
                                    ))}
                                </select>
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
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Cant."
                                        value={quantity}
                                        onChange={e => setQuantity(Number(e.target.value))}
                                        className="w-20 bg-dark-800 border border-white/10 rounded p-2 text-white"
                                    />
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="Costo Unit."
                                        value={cost}
                                        onChange={e => setCost(Number(e.target.value))}
                                        className="w-24 bg-dark-800 border border-white/10 rounded p-2 text-white"
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
                                    {newPurchase.items?.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-dark-800 p-2 rounded">
                                            <span className="text-white">{item.productName} x {item.quantity}</span>
                                            <span className="text-gold-500">${(item.cost * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 text-right text-xl font-bold text-white">
                                    Total: ${(newPurchase.items || []).reduce((acc, item) => acc + (item.cost * item.quantity), 0).toLocaleString()}
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
                                    Registrar Compra
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminPurchases;
