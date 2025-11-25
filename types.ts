export enum ProductCategory {
  SPORT = 'Deportivo',
  CLASSIC = 'Clásico',
  SMART = 'Inteligente',
  LUXURY = 'Lujo'
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: ProductCategory;
  image: string;
  description: string;
  specs: string[];
  isFeatured?: boolean;
  stock?: number; // Added stock
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Mock password
  isAdmin: boolean;
  status: 'pending' | 'approved' | 'rejected';
  role: 'admin' | 'user';
}

export interface FilterState {
  category: ProductCategory | 'All';
  minPrice: number;
  maxPrice: number;
  search: string;
}

// New Interfaces for Admin Modules

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  date: string;
  clientId?: string; // Optional for anonymous sales
  clientName: string;
  items: SaleItem[];
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface PurchaseItem {
  productId: string;
  productName: string;
  quantity: number;
  cost: number;
}

export interface Purchase {
  id: string;
  date: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseItem[];
  total: number;
  status: 'received' | 'pending';
}