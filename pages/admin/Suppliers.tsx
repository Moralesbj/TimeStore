import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Search, Trash2, Mail, Phone, User } from 'lucide-react';
import { Supplier } from '../../types';

const AdminSuppliers: React.FC = () => {
    const { suppliers, addSupplier, deleteSupplier } = useStore();
    const [showModal, setShowModal] = useState(false);
    const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
        name: '', contactName: '', email: '', phone: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addSupplier({
            id: Date.now().toString(),
            name: newSupplier.name!,
            contactName: newSupplier.contactName!,
            email: newSupplier.email!,
            phone: newSupplier.phone!
        });
        setShowModal(false);
        setNewSupplier({ name: '', contactName: '', email: '', phone: '' });
    };

    return (
        <AdminLayout title="Gestión de Proveedores">
            <div className="bg-dark-800 rounded-lg border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar proveedor..."
                            className="bg-dark-900 border border-white/10 rounded pl-10 pr-4 py-2 text-white focus:outline-none focus:border-gold-500"
                        />
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gold-500 text-black font-bold px-4 py-2 rounded flex items-center gap-2 hover:bg-gold-400"
                    >
                        <Plus className="w-5 h-5" /> Nuevo Proveedor
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {suppliers.map(supplier => (
                        <div key={supplier.id} className="bg-dark-900 p-4 rounded border border-white/5 hover:border-gold-500/50 transition-colors group">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{supplier.name}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <User className="w-3 h-3" /> {supplier.contactName}
                                    </p>
                                </div>
                                <button
                                    onClick={() => deleteSupplier(supplier.id)}
                                    className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-2 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-gold-500" /> {supplier.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-gold-500" /> {supplier.phone}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-dark-800 rounded-lg border border-white/10 w-full max-w-md">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Nuevo Proveedor</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <input
                                required placeholder="Empresa"
                                value={newSupplier.name} onChange={e => setNewSupplier({ ...newSupplier, name: e.target.value })}
                                className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                            />
                            <input
                                required placeholder="Nombre de Contacto"
                                value={newSupplier.contactName} onChange={e => setNewSupplier({ ...newSupplier, contactName: e.target.value })}
                                className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                            />
                            <input
                                required type="email" placeholder="Email"
                                value={newSupplier.email} onChange={e => setNewSupplier({ ...newSupplier, email: e.target.value })}
                                className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                            />
                            <input
                                required placeholder="Teléfono"
                                value={newSupplier.phone} onChange={e => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                                className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                            />
                            <button type="submit" className="w-full bg-gold-500 text-black font-bold py-2 rounded hover:bg-gold-400">
                                Guardar Proveedor
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminSuppliers;
