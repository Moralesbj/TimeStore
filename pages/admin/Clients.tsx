import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Search, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { Client } from '../../types';

const AdminClients: React.FC = () => {
    const { clients, addClient, deleteClient } = useStore();
    const [showModal, setShowModal] = useState(false);
    const [newClient, setNewClient] = useState<Partial<Client>>({
        name: '', email: '', phone: '', address: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addClient({
            id: Date.now().toString(),
            name: newClient.name!,
            email: newClient.email!,
            phone: newClient.phone!,
            address: newClient.address!
        });
        setShowModal(false);
        setNewClient({ name: '', email: '', phone: '', address: '' });
    };

    return (
        <AdminLayout title="Gestión de Clientes">
            <div className="bg-dark-800 rounded-lg border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar cliente..."
                            className="bg-dark-900 border border-white/10 rounded pl-10 pr-4 py-2 text-white focus:outline-none focus:border-gold-500"
                        />
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gold-500 text-black font-bold px-4 py-2 rounded flex items-center gap-2 hover:bg-gold-400"
                    >
                        <Plus className="w-5 h-5" /> Nuevo Cliente
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {clients.map(client => (
                        <div key={client.id} className="bg-dark-900 p-4 rounded border border-white/5 hover:border-gold-500/50 transition-colors group">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-bold text-white">{client.name}</h3>
                                <button
                                    onClick={() => deleteClient(client.id)}
                                    className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-2 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-gold-500" /> {client.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-gold-500" /> {client.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gold-500" /> {client.address}
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
                            <h2 className="text-xl font-bold text-white">Nuevo Cliente</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <input
                                required placeholder="Nombre Completo"
                                value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                                className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                            />
                            <input
                                required type="email" placeholder="Email"
                                value={newClient.email} onChange={e => setNewClient({ ...newClient, email: e.target.value })}
                                className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                            />
                            <input
                                required placeholder="Teléfono"
                                value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })}
                                className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                            />
                            <input
                                required placeholder="Dirección"
                                value={newClient.address} onChange={e => setNewClient({ ...newClient, address: e.target.value })}
                                className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                            />
                            <button type="submit" className="w-full bg-gold-500 text-black font-bold py-2 rounded hover:bg-gold-400">
                                Guardar Cliente
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminClients;
