import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Authentication } from './pages/Authentication/Authentication';
import { Bookings } from './pages/Bookings/Bookings';
import { Customers } from './pages/Customers/Customers';
import { Inventory } from './pages/Inventory/Inventory';
import { Analytics } from './pages/Analytics/Analytics';
import { Settings } from './pages/Settings/Settings';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import React from 'react';

const ProtectedRoute = ({ children, requireAdmin }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (requireAdmin && role !== 'ADMIN') return <Navigate to="/" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Authentication />} />
          
          <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="customers" element={<Customers />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="analytics" element={<ProtectedRoute requireAdmin><Analytics /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute requireAdmin><Settings /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
