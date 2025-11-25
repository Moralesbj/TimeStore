import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    total: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, total }) => {
    const { clearCart, toggleCart, addSale, cart, user } = useStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [cardName, setCardName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Record Sale
        const newSale = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            clientId: user?.id,
            clientName: cardName || user?.name || 'Cliente Anónimo',
            items: cart.map(item => ({
                productId: item.id,
                productName: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            total: total,
            status: 'completed' as const
        };

        addSale(newSale);

        setIsProcessing(false);
        setIsSuccess(true);

        // Close after success message
        setTimeout(() => {
            clearCart();
            setIsSuccess(false);
            setCardName('');
            onClose();
            toggleCart(); // Close the cart drawer as well
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose} />

                <div className="relative transform overflow-hidden rounded-lg bg-dark-800 border border-white/10 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                    {isSuccess ? (
                        <div className="p-8 flex flex-col items-center justify-center text-center">
                            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                            <h3 className="text-2xl font-serif text-white mb-2">¡Pago Exitoso!</h3>
                            <p className="text-gray-400">Gracias por tu compra. Recibirás un correo con los detalles.</p>
                        </div>
                    ) : (
                        <>
                            <div className="px-4 py-5 sm:px-6 border-b border-white/10 flex justify-between items-center">
                                <h3 className="text-lg font-medium leading-6 text-white flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-gold-500" />
                                    Pasarela de Pago Segura
                                </h3>
                                <button onClick={onClose} className="text-gray-400 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6 space-y-4">
                                <div className="bg-dark-900 p-4 rounded border border-white/5 mb-6">
                                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                                        <span>Total a pagar</span>
                                    </div>
                                    <div className="text-3xl font-serif text-gold-500">
                                        ${total.toLocaleString()}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Nombre en la tarjeta</label>
                                    <input
                                        type="text"
                                        required
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                        className="w-full bg-dark-900 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-500"
                                        placeholder="Juan Pérez"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Número de tarjeta</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-dark-900 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-500 pl-10"
                                            placeholder="0000 0000 0000 0000"
                                        />
                                        <CreditCard className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Fecha de expiración</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-dark-900 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-500"
                                            placeholder="MM/YY"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">CVC</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-dark-900 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold-500"
                                            placeholder="123"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full flex items-center justify-center rounded bg-gold-500 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Procesando...
                                            </span>
                                        ) : (
                                            `Pagar $${total.toLocaleString()}`
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
