import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoleDashboard from "./pages/RoleDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Toaster } from "sonner";
import {CartProvider} from "./contexts/CartContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";


export default function App() {
  return (
    <BrowserRouter>
    <CartProvider>
    <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleDashboard />
            </ProtectedRoute>
          }
        />
        <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
      />
      <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
      />
      </Routes>
      
        {/* ...your routes/components, including Navigation... */}
    </CartProvider>

    
    </BrowserRouter>
  );
}
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { CartProvider } from './contexts/CartContext';
// import Navigation from './components/Navigation';
// import Login from './pages/Login';
// import AdminDashboard from './pages/AdminDashboard';
// import BuyerDashboard from './pages/BuyerDashboard';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import { useAuth } from './contexts/AuthContext';

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const { user } = useAuth();
  
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
  
//   if (adminOnly && user.role !== 'admin') {
//     return <Navigate to="/dashboard" replace />;
//   }
  
//   return children;
// };

// const AppContent = () => {
//   const { user } = useAuth();
  
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {user && <Navigation />}
//       <main className={user ? 'pt-16' : ''}>
//         <Routes>
//           <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
//           <Route 
//             path="/admin" 
//             element={
//               <ProtectedRoute adminOnly>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/dashboard" 
//             element={
//               <ProtectedRoute>
//                 {user?.role === 'admin' ? <Navigate to="/admin" replace /> : <BuyerDashboard />}
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/cart" 
//             element={
//               <ProtectedRoute>
//                 <Cart />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/checkout" 
//             element={
//               <ProtectedRoute>
//                 <Checkout />
//               </ProtectedRoute>
//             } 
//           />
//           <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
//         </Routes>
//       </main>
//     </div>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <CartProvider>
//           <AppContent />
//         </CartProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;