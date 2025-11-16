import React, { useEffect, useState } from "react";
import api from "../../axiosInstance";
import { useOrder } from "../OrderContext";
const UsersManagement = () => {
  const [loading, setLoading] = useState(true);
  const { users, setUsers } = useOrder();

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res = await api.get("/swiggy/admin/users");
        if (res.data.success) {
          setUsers(res.data.users);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchusers();
  }, []);

  if (loading) return <p className="loading">Loading users...</p>;
  if (users.length === 0) return <p className="loading">No users found</p>;

 return (
  <div className="users-container">
    <h2 className="users-title">All Users</h2>
    <table className="user-table">
      <thead>
        <tr>
          <th>Sl.No</th>
          <th>Name</th>
          <th>Number</th>
          <th>Email</th>
          <th>Created On</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.number}</td>
            <td>{user.email}</td>
            <td>{new Date(user.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <style>{`
      .users-container {
        max-width: 900px;
        margin: 40px auto;
        padding: 0 20px;
      }
      .users-title {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 30px;
        color: #333;
        text-align: center;
      }
      .user-table {
        width: 100%;
        border-collapse: collapse;
      }
      .user-table th,
      .user-table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
      }
      .user-table th {
        background-color: #f5f5f5;
        font-weight: 600;
      }
      .user-table tr:hover {
        background-color: #f9f9f9;
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

export default UsersManagement;
