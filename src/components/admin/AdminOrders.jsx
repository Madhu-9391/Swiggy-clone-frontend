import React, { useEffect, useState } from "react";
import api from "../../axiosInstance";
import { useOrder } from "../OrderContext";
const AdminOrders = () => {
  const [loading, setLoading] = useState(true);
const {
    adminOrders,setAdminOrders
  } = useOrder();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        
const res = await api.get("/swiggy/admin/orders");
        if (res.data.success) {
          setAdminOrders(res.data.orders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return <p className="loading">Loading orders...</p>;
  if (adminOrders.length === 0)
    return <p className="loading">No orders found</p>;

  return (
    <div className="orders-container">
      <h2 className="orders-title">All Orders</h2>
      {adminOrders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <span><strong>Order ID:</strong> {order.orderId}</span>
            <span><strong>Restaurant:</strong> {order.restaurantName}</span>
          </div>
          <div className="order-header">
            <span><strong>Payment Mode:</strong> {order.paymentMode}</span>
            <span><strong>Address:</strong> {order.address}</span>
          </div>
          <table className="order-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="order-total">
            <span><strong>Subtotal:</strong> ₹{order.subtotal}</span>
            <span><strong>Delivery Fee:</strong> ₹{order.deliveryFee}</span>
            <span><strong>Total:</strong> ₹{order.total}</span>
          </div>
        </div>
      ))}

      {/* Embedded CSS */}
      <style>{`
        .orders-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 0 20px;
        }
        .orders-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 30px;
          color: #333;
          text-align: center;
        }
        .order-card {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 25px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .order-header {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 15px;
          font-weight: 500;
          color: #555;
        }
        .order-header span {
          margin-bottom: 5px;
        }
        .order-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        .order-table th,
        .order-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        .order-table th {
          background-color: #f5f5f5;
          font-weight: 600;
        }
        .order-table tr:hover {
          background-color: #f9f9f9;
        }
        .order-total {
          display: flex;
          justify-content: flex-end;
          gap: 20px;
          font-weight: 600;
          color: #333;
        }
        .loading {
          text-align: center;
          margin-top: 100px;
          font-size: 1.2rem;
          color: #777;
        }
      `}</style>
    </div>
  );
};

export default AdminOrders;
