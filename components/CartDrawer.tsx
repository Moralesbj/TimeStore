import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import PaymentModal from './PaymentModal';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, clearCart } = useStore();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={toggleCart} />

        <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
          <div className="w-full h-full bg-dark-800 shadow-2xl flex flex-col border-l border-white/10">

            {/* Header */}
            <div className="px-4 py-6 bg-dark-900 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-serif font-medium text-white">Tu Carrito</h2>
              <button onClick={toggleCart} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  <p>Tu carrito está vacío.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex py-2">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-white/10">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-white">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-400">{item.brand}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-white/20 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-white/10 text-gray-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-white/10 text-gray-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-red-400 hover:text-red-300 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 px-4 py-6 bg-dark-900">
              <div className="flex justify-between text-base font-medium text-white mb-4">
                <p>Subtotal</p>
                <p>${total.toLocaleString()}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-400 mb-6">
                Envío e impuestos calculados al finalizar compra.
              </p>
              <button
                onClick={() => setIsPaymentOpen(true)}
                className="w-full flex items-center justify-center rounded-none bg-gold-500 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-gold-400 transition-colors uppercase tracking-wider"
                disabled={cart.length === 0}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        total={total}
      />
    </>
  );
};

export default CartDrawer;