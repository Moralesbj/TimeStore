import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AIAssistant from './components/AIAssistant';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminSales from './pages/admin/Sales';
import AdminClients from './pages/admin/Clients';
import AdminSuppliers from './pages/admin/Suppliers';
import AdminPurchases from './pages/admin/Purchases';
import AdminUsers from './pages/admin/Users';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen bg-dark-900 flex flex-col font-sans text-gray-100">
          <Navbar />
          <CartDrawer />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/sales" element={<AdminSales />} />
              <Route path="/admin/clients" element={<AdminClients />} />
              <Route path="/admin/suppliers" element={<AdminSuppliers />} />
              <Route path="/admin/purchases" element={<AdminPurchases />} />
              <Route path="/admin/users" element={<AdminUsers />} />
            </Routes>
          </main>

          <AIAssistant />
          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;