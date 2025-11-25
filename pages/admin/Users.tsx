import React from 'react';
import { useStore } from '../../context/StoreContext';
import AdminLayout from '../../components/AdminLayout';
import { CheckCircle, XCircle, User as UserIcon, Shield } from 'lucide-react';

const AdminUsers: React.FC = () => {
    const { users, approveUser, rejectUser } = useStore();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'rejected': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
        }
    };

    return (
        <AdminLayout title="Gestión de Usuarios">
            <div className="bg-dark-800 rounded-lg border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400">
                        <thead className="text-xs uppercase bg-dark-900 text-gray-200">
                            <tr>
                                <th className="px-6 py-3">Usuario</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Rol</th>
                                <th className="px-6 py-3">Estado</th>
                                <th className="px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                                        <div className="p-1 bg-white/10 rounded-full">
                                            <UserIcon className="w-4 h-4" />
                                        </div>
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        {user.role === 'admin' ? (
                                            <span className="flex items-center gap-1 text-gold-500">
                                                <Shield className="w-3 h-3" /> Admin
                                            </span>
                                        ) : 'Usuario'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(user.status)}`}>
                                            {user.status === 'pending' ? 'Pendiente' :
                                                user.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        {user.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => approveUser(user.id)}
                                                    className="p-1 text-green-400 hover:bg-green-400/10 rounded transition-colors"
                                                    title="Aprobar"
                                                >
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => rejectUser(user.id)}
                                                    className="p-1 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                                                    title="Rechazar"
                                                >
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminUsers;
