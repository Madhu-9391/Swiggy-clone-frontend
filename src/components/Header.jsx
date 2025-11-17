import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useOrder } from "./OrderContext"; // Assuming this context provides cart state and actions
import api from "../axiosInstance";
// Constants that were in Cart.jsx
const DELIVERY_FEE = 40;

const Header = () => {
  // --- Start: Original Header State & Logic ---
  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  // --- End: Original Header State & Logic ---

  // --- Start: Integrated Cart State & Logic ---
  const { email,cart, addToCart, removeFromCart, setIsCartOpen, isCartOpen } =
    useOrder();
  const [orderNumber, setOrderNumber] = useState(null);
  const [payment, setPayment] = useState("cod"); // default to Cash on Delivery
  const [address, setAddress] = useState("");
  const location = useLocation();

  // Get restaurant info from location state, with fallbacks
  const { restaurantName = "Your Selected Restaurant", restaurantImage = "" } =
    location.state || {};

  // Calculate cart totals
  const subtotal = Object.values(cart).reduce(
    (sum, item) => sum + Number(item.qty) * Number(item.price),
    0
  );
  const totalItems = Object.values(cart).reduce(
    (sum, item) => sum + Number(item.qty),
    0
  );
  const total = subtotal + DELIVERY_FEE;

  // Function to handle placing the order
  const placeOrder = async () => {
    if (!address.trim()) {
      // In a real app, you would show a more user-friendly validation message.
      console.warn("Address is required to place an order.");
      return;
    }

    const orderId = "ORD" + Date.now();
    const orderData = {
      orderId,
      email: email || "guest@test.com",
      restaurantName,
      items: Object.values(cart).map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
      })),
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
      paymentMode: payment,
      createdAt: new Date(),
      address: address,
    };

    try {
      // API call to your backend to save the order
      const res = await api.post("/swiggy/myorders", orderData);
      if (res.data.success) {
  setOrderNumber(orderId);
  console.log("✅ Order saved:", res.data);
      } else {
  console.error("❌ Failed to save order:", res.data.message);
      }

    } catch (err) {
      console.error("❌ Error placing order:", err);
    }
  };

  // Handles closing the cart panel. If an order was just placed, it also clears the cart.
  const handleCloseCart = () => {
    setIsCartOpen(false);
    if (orderNumber) {
      // NOTE: This logic assumes `removeFromCart` decrements quantity.
      // For a full clear, a `clearCart()` function in your context would be more efficient.
      Object.keys(cart).forEach((id) => removeFromCart(id, "all")); // Assuming a second param to remove all
      setOrderNumber(null); // Reset for the next order
    }
  };

  // --- End: Integrated Cart State & Logic ---

  // --- Start: Original Header Effects & Handlers ---
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Effect to prevent body scroll when a modal/panel is open
  useEffect(() => {
    if (mobileMenuOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen, isCartOpen]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserName("");
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/swiggy/login");
  };

  const closeAllMenus = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };
  // --- End: Original Header Effects & Handlers ---

  return (
    <>
      {/* --- All component styles are now combined here --- */}
      <style>{`
        body { margin: 0; font-family: sans-serif; background: #f2f2f2; }
        
        /* General Header Styles */
        .header { background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000; }
        .nav-container { display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; max-width: 1200px; margin: 0 auto; }
        .nav-left { display: flex; align-items: center; gap: 24px; min-width: 0; }
        .nav-right { display: flex; align-items: center; gap: 24px; }
        .logo { width: 90px; height: auto; flex-shrink: 0; }
        .location-link { font-weight: bold; color: #333; text-decoration: none; display: flex; align-items: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        
        .nav-right a, .nav-right #signin, .nav-right .cart-trigger {
          display: flex; align-items: center; gap: 6px; text-decoration: none; color: #333; font-weight: 500; transition: color 0.2s;
        }
        .nav-right a:hover, .nav-right #signin:hover, .nav-right .cart-trigger:hover { color: #fc8019; }
        .cart-trigger { cursor: pointer; position: relative; }
        .cart-badge { position: absolute; top: -8px; right: -12px; background: #fc8019; color: white; padding: 2px 6px; font-size: 12px; border-radius: 50%; }

        /* User Dropdown Styles */
        .user-dropdown { position: relative; display: inline-block; }
        .user-btn { font-weight: bold; background: transparent; border: none; cursor: pointer; padding: 6px 10px; display: flex; align-items: center; gap: 6px; font-size: 1rem; }
        .dropdown-menu { position: absolute; top: 100%; right: 0; margin-top: 10px; width: 180px; background: #fff; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); z-index: 1001; }
        .dropdown-menu ul { list-style: none; margin: 0; padding: 6px 0; }
        .dropdown-menu a, .dropdown-menu button { display: block; width: 100%; padding: 10px 14px; text-align: left; background: none; border: none; cursor: pointer; font-size: 14px; color: #333; text-decoration: none; }
        .dropdown-menu a:hover, .dropdown-menu button:hover { background: #f5f5f5; }

        /* Mobile Menu Specific Styles */
        .nav-toggle { display: none; cursor: pointer; font-size: 24px; }
        .nav-close-btn { display: none; position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 28px; cursor: pointer; }
        .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 998; }

        /* Cart Panel Styles */
        .cart-panel { position: fixed; top: 0; right: -100%; width: 100%; max-width: 380px; height: 100%; background: white; box-shadow: -2px 0 10px rgba(0,0,0,0.2); transition: right 0.35s ease-in-out; padding: 1.5rem; z-index: 1050; overflow-y: auto; display: flex; flex-direction: column; }
        .cart-panel.open { right: 0; }
        .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .cart-header h2 { margin: 0; }
        .cart-header button { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #555; }
        .cart-content { flex-grow: 1; }
        .cart-item { border-bottom: 1px solid #eee; padding: 1rem 0; display: flex; justify-content: space-between; align-items: center; }
        .cart-item button { margin: 0 4px; padding: 4px 10px; border: 1px solid #ddd; background: white; color: #28a745; border-radius: 4px; cursor: pointer; font-weight: bold; }
        .cart-empty-msg { text-align: center; color: #777; margin-top: 4rem; }
        .summary { margin-top: 1rem; border-top: 1px solid #eee; padding-top: 1rem; }
        .summary p { display: flex; justify-content: space-between; margin: 8px 0; }
        .summary button.place-order-btn { background-color: #28a745; color: white; padding: 12px 20px; margin-top: 10px; width: 100%; border: none; border-radius: 5px; cursor: pointer; font-size: 1rem; font-weight: bold; }
        .order-confirmation { text-align: center; padding: 2rem; }
        .order-confirmation h2 { color: #28a745; }
        .address-input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; margin-top: 10px; box-sizing: border-box; }
        
        /* Media Queries for Responsiveness */
        @media (max-width: 992px) {
          .nav-right { position: fixed; top: 0; right: -100%; width: 80vw; max-width: 320px; height: 100vh; background: #fff; flex-direction: column; align-items: flex-start; justify-content: flex-start; padding: 70px 30px 30px; gap: 28px; box-shadow: -2px 0 5px rgba(0,0,0,0.1); transition: right 0.35s ease-in-out; z-index: 999; }
          .nav-right.nav-right--open { right: 0; }
          .nav-toggle, .nav-close-btn { display: block; }
          .nav-right a, .nav-right #signin, .nav-right .cart-trigger, .user-dropdown { width: 100%; padding: 8px 0; font-size: 1.1rem; }
          .user-btn { justify-content: flex-start; padding-left: 0; }
        }
        @media (max-width: 480px) {
          .nav-container { padding: 8px 16px; }
          .logo { width: 75px; }
          .nav-left { gap: 12px; }
          .location-link span { display: none; }
          .location-link i { font-size: 20px; }
          .cart-panel { max-width: 90vw; }
        }
      `}</style>

      <header className="header">
        <div className="nav-container">
          <div className="nav-left">
            <img src="/images/logo.png" alt="logo" className="logo" />
            <a href="#" className="location-link">
              <span>Other</span>
              <i className="ri-arrow-down-s-line"></i>
            </a>
          </div>
          <div
            className={`nav-right ${mobileMenuOpen ? "nav-right--open" : ""}`}
          >
            <button
              className="nav-close-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="ri-close-line"></i>
            </button>
            <a href="#" onClick={closeAllMenus}>
              <i className="ri-suitcase-line"></i> Swiggy Corporate
            </a>
            <a href="#" onClick={closeAllMenus}>
              <i className="ri-search-line"></i> Search
            </a>
            <a href="#" onClick={closeAllMenus}>
              <i className="ri-discount-percent-line"></i> Offers
            </a>
            <a href="#" onClick={closeAllMenus}>
              <i className="ri-question-line"></i> Help
            </a>

            {userName ? (
              <div className="user-dropdown" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="user-btn"
                >
                  <i className="ri-user-3-fill"></i> {userName}
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <ul>
                      <li>
                        <Link to="/swiggy/myorders" onClick={closeAllMenus}>
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <Link to="/swiggy/account" onClick={closeAllMenus}>
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link to="/swiggy/seller" onClick={closeAllMenus}>
                          Become a Seller?
                        </Link>
                      </li>

                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/swiggy/login" id="signin" onClick={closeAllMenus}>
                <i className="ri-user-3-fill"></i> Sign In
              </Link>
            )}

            <div className="cart-trigger" onClick={() => setIsCartOpen(true)}>
              <i className="ri-shopping-cart-2-line"></i> Cart
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </div>
          </div>
          <div className="nav-toggle" onClick={() => setMobileMenuOpen(true)}>
            <i className="ri-menu-line"></i>
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu or cart panel */}

      {(mobileMenuOpen || isCartOpen) && (
        <div
          className="overlay"
          onClick={() => {
            setMobileMenuOpen(false);
            handleCloseCart();
          }}
        ></div>
      )}

      {/* --- Cart Panel JSX --- */}
      <div className={`cart-panel ${isCartOpen ? "open" : ""}`}>
        <div className="cart-content">
          {orderNumber ? (
            <div className="order-confirmation">
              <h2>✅ Order Placed!</h2>
              <p>
                Your tracking number is: <strong>#{orderNumber}</strong>
              </p>
            </div>
          ) : totalItems === 0 ? (
            <p className="cart-empty-msg">
              Your cart is empty. Add items to get started!
            </p>
          ) : (
            <>
              <div className="cart-items">
                {Object.values(cart).map((item) => (
                  <div key={item.id} className="cart-item">
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      <small>₹{Number(item.price) * Number(item.qty)}</small>
                    </div>
                    <div>
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() =>
                          addToCart(item.id, item.name, item.price)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="summary">
                <p>
                  <span>Subtotal</span> <span>₹{subtotal}</span>
                </p>
                <p>
                  <span>Delivery Fee</span> <span>₹{DELIVERY_FEE}</span>
                </p>
                <hr />
                <p>
                  <strong>
                    <span>Total</span> <span>₹{total}</span>
                  </strong>
                </p>

                <label htmlFor="address">Delivery Address:</label>
                <input
                  id="address"
                  type="text"
                  className="address-input"
                  value={address}
                  placeholder="Enter your full address"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />

                {/* Add Payment Options Here if needed */}

                <button className="place-order-btn" onClick={placeOrder}>
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
