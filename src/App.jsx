import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { OrderProvider } from "./components/OrderContext";
import axios from "./axiosInstance"; // Axios instance using Railway backend
import "./App.css";

// 🔹 User Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Parts from "./components/Parts";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import MyOrders from "./components/MyOrders";

// 🔹 Admin Components
import AdminDashBoard from "./components/AdminDashBoard";
import UsersManagement from "./components/admin/UsersManagement";
import AdminOrders from "./components/admin/AdminOrders";

// 🔹 Protected Route for User
const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/swiggy/auth-check");
        setIsAuth(res.data.success);
      } catch {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) return <p>Loading...</p>;
  if (!isAuth) return <Navigate to="/swiggy/login" replace />;
  return children;
};

// 🔹 Protected Route for Admin
const AdminProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("/swiggy/admin/auth-check");
        setIsAdmin(res.data.role === "admin");
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  if (isAdmin === null) return <p>Loading...</p>;
  if (!isAdmin) return <Navigate to="/swiggy/login" replace />;
  return children;
};

// 🔹 Layout wrapper
function AppLayout() {
  const location = useLocation();

  // Routes where Header/Footer are hidden
  const hideLayoutRoutes = [
    "/swiggy/login",
    "/swiggy/register",
    "/swiggy/cart",
    "/swiggy/admin",
    "/swiggy/admin/users",
    "/swiggy/admin/orders",
  ];

  const isMinimalLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="App1">
      {!isMinimalLayout && <Header />}

      <Routes>
        {/* 🔹 Public Routes */}
        <Route path="/swiggy" element={<Parts />} />
        <Route path="/swiggy/login" element={<Login />} />
        <Route path="/swiggy/register" element={<Register />} />

        {/* 🔹 Protected User Routes */}
        <Route
          path="/swiggy/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/swiggy/profile"
          element={
            <ProtectedRoute>
              <Parts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/swiggy/myorders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* 🔹 Protected Admin Routes */}
        <Route
          path="/swiggy/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashBoard />
            </AdminProtectedRoute>
          }
        >
          <Route path="users" element={<UsersManagement />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>

      {!isMinimalLayout && <Footer />}
    </div>
  );
}

// 🔹 Main App Component
function App() {
  return (
    <Router>
      <OrderProvider>
        <AppLayout />
      </OrderProvider>
    </Router>
  );
}

export default App;
