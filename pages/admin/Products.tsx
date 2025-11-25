import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types';
import { Trash2, Plus, Edit } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const AdminProducts: React.FC = () => {
    const { products, addProduct, deleteProduct, updateProduct } = useStore();
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        brand: '',
        price: 0,
        category: ProductCategory.CLASSIC,
        description: '',
        stock: 10
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            updateProduct({
                ...formData,
                image: products.find(p => p.id === formData.id)?.image || '',
                specs: products.find(p => p.id === formData.id)?.specs || [],
                isFeatured: products.find(p => p.id === formData.id)?.isFeatured
            });
            setIsEditing(false);
        } else {
            addProduct({
                id: Date.now().toString(),
                ...formData,
                image: `https://picsum.photos/400/400?random=${Date.now()}`,
                specs: ['Nuevo ingreso', 'Garantía TimeStore'],
                isFeatured: false
            });
        }
        setFormData({ id: '', name: '', brand: '', price: 0, category: ProductCategory.CLASSIC, description: '', stock: 10 });
    };

    const startEdit = (product: any) => {
        setFormData({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            category: product.category,
            description: product.description,
            stock: product.stock || 10
        });
        setIsEditing(true);
    };

    return (
        <AdminLayout title="Gestión de Productos">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Form */}
                <div className="bg-dark-800 p-6 rounded-lg border border-white/10 h-fit">
                    <h2 className="text-xl text-white font-bold mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-gold-500" /> {isEditing ? 'Editar Producto' : 'Agregar Producto'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Nombre</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Marca</label>
                            <input
                                required
                                type="text"
                                value={formData.brand}
                                onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Precio</label>
                                <input
                                    required
                                    type="number"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                    className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Stock</label>
                                <input
                                    required
                                    type="number"
                                    value={formData.stock}
                                    onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                                    className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Categoría</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                                className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                            >
                                {Object.values(ProductCategory).map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Descripción</label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-dark-900 border border-white/10 rounded p-2 text-white"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-gold-500 text-black font-bold py-2 rounded hover:bg-gold-400">
                                {isEditing ? 'Actualizar' : 'Guardar'}
                            </button>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({ id: '', name: '', brand: '', price: 0, category: ProductCategory.CLASSIC, description: '', stock: 10 });
                                    }}
                                    className="px-4 bg-dark-700 text-white rounded hover:bg-dark-600"
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List */}
                <div className="lg:col-span-2 bg-dark-800 p-6 rounded-lg border border-white/10">
                    <h2 className="text-xl text-white font-bold mb-4">Inventario Actual</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-gray-400">
                            <thead className="text-xs uppercase bg-dark-900 text-gray-200">
                                <tr>
                                    <th className="px-4 py-3">Producto</th>
                                    <th className="px-4 py-3">Categoría</th>
                                    <th className="px-4 py-3">Precio</th>
                                    <th className="px-4 py-3">Stock</th>
                                    <th className="px-4 py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {products.map(p => (
                                    <tr key={p.id} className="hover:bg-white/5">
                                        <td className="px-4 py-3 font-medium text-white">{p.name} <span className="text-gray-500 text-xs block">{p.brand}</span></td>
                                        <td className="px-4 py-3">{p.category}</td>
                                        <td className="px-4 py-3">${p.price.toLocaleString()}</td>
                                        <td className="px-4 py-3">{p.stock}</td>
                                        <td className="px-4 py-3 flex gap-2">
                                            <button
                                                onClick={() => startEdit(p)}
                                                className="text-blue-400 hover:text-blue-300 p-1"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(p.id)}
                                                className="text-red-400 hover:text-red-300 p-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
};

export default AdminProducts;
