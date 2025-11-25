import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem, User, Client, Supplier, Sale, Purchase } from '../types';
import { auth, db } from '../src/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  getDoc
} from 'firebase/firestore';

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
  users: User[];

  // Actions
  addProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;

  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (user: Partial<User>) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  toggleCart: () => void;

  // Admin Actions
  addClient: (client: Client) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  addSupplier: (supplier: Supplier) => Promise<void>;
  deleteSupplier: (id: string) => Promise<void>;
  addSale: (sale: Sale) => Promise<void>;
  addPurchase: (purchase: Purchase) => Promise<void>;

  // User Management
  approveUser: (id: string) => Promise<void>;
  rejectUser: (id: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Admin State
  const [clients, setClients] = useState<Client[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user details from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        } else {
          // Fallback if doc missing (shouldn't happen with proper register)
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore Listeners
  useEffect(() => {
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product)));
    });

    const unsubClients = onSnapshot(collection(db, 'clients'), (snapshot) => {
      setClients(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Client)));
    });

    const unsubSuppliers = onSnapshot(collection(db, 'suppliers'), (snapshot) => {
      setSuppliers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Supplier)));
    });

    const unsubSales = onSnapshot(collection(db, 'sales'), (snapshot) => {
      setSales(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Sale)));
    });

    const unsubPurchases = onSnapshot(collection(db, 'purchases'), (snapshot) => {
      setPurchases(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Purchase)));
    });

    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as User)));
    });

    return () => {
      unsubProducts();
      unsubClients();
      unsubSuppliers();
      unsubSales();
      unsubPurchases();
      unsubUsers();
    };
  }, []);

  // Actions
  const addProduct = async (product: Product) => {
    const { id, ...data } = product; // Firestore generates ID, so remove if present
    await addDoc(collection(db, 'products'), data);
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
  };

  const updateProduct = async (product: Product) => {
    const { id, ...data } = product;
    await updateDoc(doc(db, 'products', id), data);
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
    try {
      if (!password) return { success: false, message: 'Contraseña requerida' };

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        if (userData.status === 'pending') {
          await signOut(auth);
          return { success: false, message: 'Cuenta pendiente de aprobación.' };
        }
        if (userData.status === 'rejected') {
          await signOut(auth);
          return { success: false, message: 'Cuenta rechazada.' };
        }
        return { success: true };
      }
      return { success: false, message: 'Datos de usuario no encontrados.' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };

  const register = async (userData: Partial<User>) => {
    try {
      if (!userData.email || !userData.password) {
        return { success: false, message: 'Email y contraseña requeridos' };
      }

      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);

      const newUser: User = {
        id: userCredential.user.uid,
        name: userData.name!,
        email: userData.email!,
        isAdmin: false, // Default to false for new registrations
        role: 'user', // Default role
        status: 'pending' // Default status
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
      return { success: true, message: 'Registro exitoso.' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCart([]); // Clear cart on logout
  };

  // Admin Actions
  const addClient = async (client: Client) => {
    const { id, ...data } = client;
    await addDoc(collection(db, 'clients'), data);
  };

  const deleteClient = async (id: string) => {
    await deleteDoc(doc(db, 'clients', id));
  };

  const addSupplier = async (supplier: Supplier) => {
    const { id, ...data } = supplier;
    await addDoc(collection(db, 'suppliers'), data);
  };

  const deleteSupplier = async (id: string) => {
    await deleteDoc(doc(db, 'suppliers', id));
  };

  const addSale = async (sale: Sale) => {
    const { id, ...data } = sale;
    await addDoc(collection(db, 'sales'), data);

    // Update stock
    for (const item of sale.items) {
      const productRef = doc(db, 'products', item.productId);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const currentStock = productSnap.data().stock || 0;
        await updateDoc(productRef, { stock: currentStock - item.quantity });
      }
    }
  };

  const addPurchase = async (purchase: Purchase) => {
    const { id, ...data } = purchase;
    await addDoc(collection(db, 'purchases'), data);

    // Update stock
    for (const item of purchase.items) {
      const productRef = doc(db, 'products', item.productId);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const currentStock = productSnap.data().stock || 0;
        await updateDoc(productRef, { stock: currentStock + item.quantity });
      }
    }
  };

  const approveUser = async (id: string) => {
    await updateDoc(doc(db, 'users', id), { status: 'approved' });
  };

  const rejectUser = async (id: string) => {
    await updateDoc(doc(db, 'users', id), { status: 'rejected' });
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