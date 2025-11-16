// client/src/components/admin/UserManagement.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addUser,
  deleteUser,
  unblockUser,
} from "../../redux/slices/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id)).then(() => dispatch(fetchUsers()));
    }
  };

  const handleUnblock = (id) => {
    dispatch(unblockUser(id)).then(() => dispatch(fetchUsers()));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-left">
        User Management
      </h2>

      

      {/* Users Table */}
      <div className="border-2 border-blue-700 rounded-lg bg-white shadow-lg overflow-hidden">
        {loading ? (
          <p className="text-blue-700 p-4">Loading users...</p>
        ) : error ? (
          <p className="text-red-300 p-4">{error}</p>
        ) : (
          <table className="w-full">
            <thead className="bg-blue-900 text-white font-bold">
              <tr>
                <th className="p-3 text-center border-r border-blue-700">
                  Name
                </th>
                <th className="p-3 text-center border-r border-blue-700">
                  Email
                </th>
                <th className="p-3 text-center border-r border-blue-700">
                  Role
                </th>
                <th className="p-3 text-center border-r border-blue-700">
                  Status
                </th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isBlocked = u.status === "blocked";
                return (
                  <tr key={u._id} className="bg-white border-t border-blue-700">
                    <td className="p-3 text-center border-r border-blue-700 text-blue-900">
                      {u.name}
                    </td>
                    <td className="p-3 text-center border-r border-blue-700 text-blue-900">
                      {u.email}
                    </td>
                    <td className="p-3 text-center border-r border-blue-700 text-blue-900 capitalize">
                      {u.role}
                    </td>
                    <td className="p-3 text-center border-r border-blue-700">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          isBlocked
                            ? "bg-red-600 text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="p-3 text-center text-blue-900">
                      {isBlocked ? (
                        <button
                          onClick={() => handleUnblock(u._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold shadow"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold shadow"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
