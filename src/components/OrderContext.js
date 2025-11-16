import React, { createContext, useContext, useState } from "react";

// Create Context
const OrderContext = createContext();

// Custom Hook to use context easily
export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  // 🔹 Global states
  const [cart, setCart] = useState({});
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]); // ✅ Added for AdminOrders.jsx
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [email,setEmail]=useState('');

  // 🔹 Add item to cart
  const addToCart = (id, name, price) => {
    setCart((prev) => ({
      ...prev,
      [id]: prev[id]
        ? { ...prev[id], qty: prev[id].qty + 1 }
        : { id, name, price: Number(price), qty: 1 },
    }));
  };

  // 🔹 Remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      if (prev[id].qty === 1) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return {
        ...prev,
        [id]: { ...prev[id], qty: prev[id].qty - 1 },
      };
    });
  };

  // 🔹 Place order
  const placeOrderHandler = (restaurantName, restaurantImage, paymentMode) => {
    if (Object.keys(cart).length === 0) return null;

    const subtotal = Object.values(cart).reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
    const DELIVERY_FEE = 40;
    const total = subtotal + DELIVERY_FEE;

    const newOrder = {
      orderId: Date.now(),
      restaurantName,
      restaurantImage,
      items: Object.values(cart),
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
      paymentMode,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart({});
    return newOrder.orderId;
  };

  // 🔹 Total cart items count
  const totalItems = Object.values(cart).reduce(
    (sum, item) => sum + item.qty,
    0
  );

  // 🔹 Context value (shared to all components)
  const contextValue = {
    cart,
    setCart,
    users,
    setUsers,
    orders,
    setOrders,
    adminOrders,       // ✅ Added
    setAdminOrders,    // ✅ Added
    addToCart,
    removeFromCart,
    placeOrderHandler,
    isCartOpen,
    setIsCartOpen,
    totalItems,
    email,setEmail
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};
