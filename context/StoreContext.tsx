import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem, User, Client, Supplier, Sale, Purchase } from '../types';
// import { INITIAL_PRODUCTS } from '../data'; // Moved to types or keep here? data.ts needs update if types changed.
// Assuming INITIAL_PRODUCTS is still in data.ts but might need casting if Product type changed (stock added).
import { INITIAL_PRODUCTS as DATA_INITIAL_PRODUCTS } from '../data';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  isCartOpen: boolean;

  // Admin Data
  clients: Client[];
  suppliers: Supplier[];
  sales: Sale[];
  purchases: Purchase[];
  users: User[]; // All registered users

  // Actions
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (product: Product) => void; // Added update

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;

  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (user: Partial<User>) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  toggleCart: () => void;

  // Admin Actions
  addClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  addSupplier: (supplier: Supplier) => void;
  deleteSupplier: (id: string) => void;
  addSale: (sale: Sale) => void;
  addPurchase: (purchase: Purchase) => void;

  // User Management
  approveUser: (id: string) => void;
  rejectUser: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with stock if missing
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem('timestore_products');
    return stored ? JSON.parse(stored) : DATA_INITIAL_PRODUCTS.map(p => ({ ...p, stock: p.stock || 10 }));
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('timestore_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Admin State
  const [clients, setClients] = useState<Client[]>(() => {
    const stored = localStorage.getItem('timestore_clients');
    return stored ? JSON.parse(stored) : [];
  });
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const stored = localStorage.getItem('timestore_suppliers');
    return stored ? JSON.parse(stored) : [];
  });
  const [sales, setSales] = useState<Sale[]>(() => {
    const stored = localStorage.getItem('timestore_sales');
    return stored ? JSON.parse(stored) : [];
  });
  const [purchases, setPurchases] = useState<Purchase[]>(() => {
    const stored = localStorage.getItem('timestore_purchases');
    return stored ? JSON.parse(stored) : [];
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem('timestore_users_db');
      let initialUsers: User[] = stored ? JSON.parse(stored) : [];

      // Ensure Master Admin always exists
      if (!initialUsers.some(u => u.email === 'admin@timestore.com')) {
        const masterAdmin: User = {
          id: 'admin-master',
          name: 'Master Admin',
          email: 'admin@timestore.com',
          password: 'admin',
          isAdmin: true,
          role: 'admin',
          status: 'approved'
        };
        return [...initialUsers, masterAdmin];
      }
      return initialUsers;
    } catch (e) {
      console.error('Error loading users:', e);
      return [];
    }
  });

  // Sync with other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'timestore_users_db' && e.newValue) {
        setUsers(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save to LocalStorage on changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('timestore_users_db', JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => localStorage.setItem('timestore_clients', JSON.stringify(clients)), [clients]);
  useEffect(() => localStorage.setItem('timestore_suppliers', JSON.stringify(suppliers)), [suppliers]);
  useEffect(() => localStorage.setItem('timestore_sales', JSON.stringify(sales)), [sales]);
  useEffect(() => localStorage.setItem('timestore_purchases', JSON.stringify(purchases)), [purchases]);
  useEffect(() => localStorage.setItem('timestore_products', JSON.stringify(products)), [products]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const login = async (email: string, password?: string) => {
    const foundUser = users.find(u => u.email === email);

    if (!foundUser) {
      return { success: false, message: 'Usuario no encontrado.' };
    }

    if (foundUser.password !== password) {
      return { success: false, message: 'Contraseña incorrecta.' };
    }

    if (foundUser.status === 'pending') {
      return { success: false, message: 'Tu cuenta está pendiente de aprobación por un administrador.' };
    }

    if (foundUser.status === 'rejected') {
      return { success: false, message: 'Tu cuenta ha sido rechazada. Contacta al administrador.' };
    }

    setUser(foundUser);
    localStorage.setItem('timestore_user', JSON.stringify(foundUser));
    return { success: true };
  };

  const register = async (userData: Partial<User>) => {
    if (users.some(u => u.email === userData.email)) {
      return { success: false, message: 'El email ya está registrado.' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name!,
      email: userData.email!,
      password: userData.password!,
      isAdmin: false,
      role: 'user',
      status: 'pending' // Default status
    };

    setUsers(prev => [...prev, newUser]);
    return { success: true, message: 'Registro exitoso. Espera la aprobación del administrador.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('timestore_user');
  };

  // Admin Actions Implementation
  const addClient = (client: Client) => setClients(prev => [...prev, client]);
  const deleteClient = (id: string) => setClients(prev => prev.filter(c => c.id !== id));

  const addSupplier = (supplier: Supplier) => setSuppliers(prev => [...prev, supplier]);
  const deleteSupplier = (id: string) => setSuppliers(prev => prev.filter(s => s.id !== id));

  const addSale = (sale: Sale) => {
    setSales(prev => [...prev, sale]);
    // Update stock
    sale.items.forEach(item => {
      setProducts(prev => prev.map(p =>
        p.id === item.productId ? { ...p, stock: (p.stock || 0) - item.quantity } : p
      ));
    });
  };

  const addPurchase = (purchase: Purchase) => {
    setPurchases(prev => [...prev, purchase]);
    // Update stock
    purchase.items.forEach(item => {
      setProducts(prev => prev.map(p =>
        p.id === item.productId ? { ...p, stock: (p.stock || 0) + item.quantity } : p
      ));
    });
  };

  // User Management
  const approveUser = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'approved' } : u));
  };

  const rejectUser = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'rejected' } : u));
  };

  return (
    <StoreContext.Provider value={{
      products, cart, user, isCartOpen,
      clients, suppliers, sales, purchases, users,
      addProduct, deleteProduct, updateProduct,
      addToCart, removeFromCart, updateQuantity, clearCart,
      login, register, logout, toggleCart,
      addClient, deleteClient, addSupplier, deleteSupplier, addSale, addPurchase,
      approveUser, rejectUser
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};