import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { useOrder } from "./OrderContext"; // ✅ add this
import { useNavigate } from "react-router-dom";
import api from "../axiosInstance";
const MENU_ITEMS = [
  { id: 1, name: "Paneer Butter Masala", price: 220 },
  { id: 2, name: "Butter Naan", price: 40 },
  { id: 3, name: "Veg Biryani", price: 180 },
  { id: 4, name: "Gulab Jamun", price: 70 },
  { id: 5, name: "Chicken Lollipop Biryani", price: 349 },
  { id: 6, name: "Chicken Dum Biryani", price: 249 },
  { id: 7, name: "Chicken Fry Biryani", price: 249 },
];

const DELIVERY_FEE = 40;
const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    addToCart,
    removeFromCart,
    placeOrderHandler,
    setIsCartOpen,
    isCartOpen,
  } = useOrder();

  const [orderNumber, setOrderNumber] = useState(null);
  const [payment, setPayment] = useState("cod"); // default COD
  const [address, setAddress] = useState("");

  const location = useLocation();
  const { restaurantName = "Your Selected Restaurant", restaurantImage = "" } =
    location.state || {};

  const placeOrder = async () => {
    // generate a unique order ID
    const orderId = "ORD" + Date.now();

    // prepare order data
    const orderData = {
      orderId,
      
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
      // send data to backend
      const res = await api.post("/swiggy/orders", orderData);

      const data = res.data;

      if (data.success) {
        setOrderNumber(orderId); // show order confirmation
        // clear cart if needed
        Object.keys(cart).forEach((id) => removeFromCart(id));
        console.log("✅ Order saved to MongoDB:", data);
      } else {
        console.error("❌ Failed to save order:", data.message);
      }
    } catch (err) {
      console.error("❌ Error placing order:", err);
    }
  };

  const subtotal = Object.values(cart).reduce(
    (sum, item) => sum + Number(item.qty) * Number(item.price),
    0
  );
  const totalItems = Object.values(cart).reduce(
    (sum, item) => sum + Number(item.qty),
    0
  );
  const total = subtotal + DELIVERY_FEE;

  return (
    <div>
      <Header />
      <style>{`
        body {
          margin: 0;
          font-family: sans-serif;
          background: #f2f2f2;
        }
        .cart-icon {
          background: #eee;
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
        }

        .cart-icon span {
          position: absolute;
          top: -8px;
          right: -8px;
          background: red;
          color: white;
          padding: 2px 6px;
          font-size: 12px;
          border-radius: 50%;
        }

        .restaurant-info {
          text-align: center;
          padding: 1rem;
        }
        .restaurant-info h2{
        font-weight:bold;
        }

        .restaurant-info img {
          width: 23vw;
          border-radius: 10px;
          height:30vh;
        }

        .menu {
          padding: 1rem;
          width:100%;
          height:100%;
          margin: auto;
        }

        .menu-item {
          background: white;
          margin-bottom: 1rem;
          text-align:center;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .menu-item h3{
        width:30vw;
        text-align:start;
        }
        .menu-item button {
          background: #28a745;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
        }
          .menu-item p{
          text-align:center;}

        .cart-panel {
          position: fixed;
          top: 0;
          right: -100%;
          width: 300px;
          height: 100%;
          background: white;
          box-shadow: -2px 0 10px rgba(0,0,0,0.2);
          transition: right 0.3s ease;
          padding: 1rem;
          z-index: 1000;
          overflow-y: auto;
        }

        .cart-panel.open {
          right: 0;
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-header button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .cart-item {
          border-bottom: 1px solid #ddd;
          padding: 0.5rem 0;
          display: flex;
          justify-content: space-between;
        }

        .cart-item button {
          margin: 0 3px;
          padding: 3px 8px;
          border: none;
          background: #007bff;
          color: white;
          border-radius: 3px;
          cursor: pointer;
        }

        .summary {
          margin-top: 1rem;
        }

        .summary button {
          background-color: #ff6600;
          color: white;
          padding: 10px 20px;
          margin-top: 10px;
          width: 100%;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }

        .order-confirmation {
          text-align: center;
          padding: 2rem;
        }

        .order-confirmation h2 {
          color: green;
        }
          @media screen and (max-width:768px) {
          .restaurant-info img {
          width: 35vw;
          height:20vw;
        }
          }

      `}</style>

      {/* Restaurant info */}
      {restaurantName && (
        <div className="restaurant-info">
          <h2>{restaurantName}</h2>
          {restaurantImage && (
            <img src={restaurantImage} alt={restaurantName} />
          )}
        </div>
      )}

      {/* Cart header */}
      

      {/* Menu items */}
      <div className="menu">
        {MENU_ITEMS.map((item) => (
          <div key={item.id} className="menu-item" >
           
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
       
            <button onClick={() => addToCart(item.id, item.name, item.price)}>
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Cart panel */}
      <div className={`cart-panel ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button
            onClick={() => {
              setIsCartOpen(false); // close the cart panel
              if (orderNumber) {
                Object.keys(cart).forEach((id) => removeFromCart(id)); // empty the cart
                setOrderNumber(null); // reset order confirmation for next order
              }
            }}
          >
            ✖
          </button>
        </div>

        <div className="cart-content">
          {orderNumber ? (
            <div className="order-confirmation">
              <h2>✅ Order Placed!</h2>
              <p>
                Your tracking number is: <strong>#{orderNumber}</strong>
              </p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {Object.keys(cart).length > 0 && (
                  <div className="restaurant-info">
                    <h3>{restaurantName}</h3>
                    {restaurantImage && (
                      <img
                        src={restaurantImage}
                        width="80px"
                        height="100px"
                        alt={restaurantName}
                      />
                    )}
                  </div>
                )}
                {Object.values(cart).map((item) => (
                  <div key={item.id} className="cart-item">
                    <div>
                      <strong>{item.name}</strong>
                      <br />₹{Number(item.price)} × {Number(item.qty)} = ₹
                      {Number(item.price) * Number(item.qty)}
                    </div>

                    <div>
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <button onClick={() => addToCart(item.id)}>+</button>
                    </div>
                  </div>
                ))}
              </div>

              {totalItems > 0 && (
                <div className="summary">
                  <p>Subtotal: ₹{subtotal}</p>
                  <p>Delivery Fee: ₹{DELIVERY_FEE}</p>
                  <hr />
                  <p>
                    <strong>Total: ₹{total}</strong>
                  </p>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    id="cod"
                    checked={payment === "cod"}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <label htmlFor="cod">Cash On Delivery</label>
                  <br />

                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    id="upi"
                    checked={payment === "upi"}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <label htmlFor="upi">UPI</label>

                  <p>Selected: {payment}</p>

                  <label>Location:</label>
                  <br />
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={address}
                    placeholder="village,mandal,district,pincode"
                    style={{ width: "300px", height: "60px" }}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    required
                  />

                  {/* <button onClick={()=>{navigate(`${location.pathname}/checkout`);}}>Place Order</button> */}
                  <button onClick={placeOrder}>Place Order</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
