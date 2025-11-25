import React, { useState } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getGeminiRecommendation } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { products } = useStore();

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse('');
    
    const answer = await getGeminiRecommendation(query, products);
    setResponse(answer);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gold-500 text-black p-4 rounded-full shadow-lg hover:bg-gold-400 transition-all z-30 hover:scale-110"
        title="Asistente IA"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
           
           <div className="relative bg-dark-800 w-full max-w-lg rounded-xl shadow-2xl border border-white/10 flex flex-col max-h-[80vh]">
             {/* Header */}
             <div className="p-4 border-b border-white/10 flex justify-between items-center bg-dark-900 rounded-t-xl">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <h3 className="font-serif font-medium text-white">TimeStore AI Concierge</h3>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                 <X className="w-5 h-5" />
               </button>
             </div>

             {/* Chat Area */}
             <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-[300px]">
               {!response && !isLoading && (
                 <div className="text-center text-gray-400 mt-10">
                   <p>¿Buscas un reloj para un evento especial? ¿Un regalo?</p>
                   <p className="text-sm mt-2 text-gold-400">Pregúntame y analizaré nuestro catálogo.</p>
                 </div>
               )}

               {isLoading && (
                 <div className="flex justify-center items-center py-10">
                   <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
                 </div>
               )}

               {response && (
                 <div className="bg-dark-700 p-4 rounded-lg border border-white/5">
                   <p className="text-gray-200 whitespace-pre-line text-sm leading-relaxed">{response}</p>
                 </div>
               )}
             </div>

             {/* Input */}
             <form onSubmit={handleAsk} className="p-4 border-t border-white/10 bg-dark-900 rounded-b-xl flex gap-2">
               <input
                 type="text"
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 placeholder="Ej: Necesito un reloj deportivo de menos de $2000..."
                 className="flex-1 bg-dark-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-500"
               />
               <button 
                 type="submit"
                 disabled={isLoading || !query}
                 className="bg-gold-500 text-black p-2 rounded-lg hover:bg-gold-400 disabled:opacity-50 transition-colors"
               >
                 <Send className="w-5 h-5" />
               </button>
             </form>
           </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;