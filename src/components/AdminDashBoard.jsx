import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/admin/Navbar';
import AdminSidebar from '../components/admin/AdminSideBar';

import { useOrder } from "./OrderContext";
const AdminDashboardPage = () => {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const _toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
const {
    orders
  } = useOrder();
  return (
    <div className=" min-h-screen bg-gray-200">
      <AdminNavbar
        adminName={'Admin'}
        
        onToggleSidebar={_toggleSidebar}
      />

      <div className="flex pt-16 transition-all duration-300">
        {sidebarOpen && <AdminSidebar />}

        <main
          className={`flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)] transition-all duration-300 ${sidebarOpen ? 'ml-0 md:ml-0' : ''
            }`}
        >
          {/* Profile Card */}
          <div className="flex flex-col md:flex-row items-start bg-orange-450 rounded-lg shadow-md p-6 mb-6 animate-fade-in">
  <div className="relative group flex-shrink-0">
    <img
      
      alt="Profile"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = 'https://placehold.co/150x150?text=Admin';
      }}
      className="w-24 h-24 rounded-full border-4 border-white object-cover transform transition-transform duration-300 group-hover:scale-110"
    />
  </div>
  <div className="md:ml-6 mt-4 md:mt-0 text-left bg-orange-400 m-4">
    <h2 className="text-2xl font-bold text-black ">Admin</h2>
    <p className="text-black mt-2 leading-relaxed">
      Responsible for overseeing platform operations and ensuring user compliance. <br />
      Manages user data, handles reports, and maintains system integrity. <br />
      Monitors analytics to drive informed decisions and improvements. <br />
      Acts as the primary point of control for administrative tasks and updates.
    </p>
  </div>
</div>


          {/* Four Boxes */}
          {/* Four Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'USERS',
                text: 'View and manage all registered users. Control access, update profiles, and monitor user activities.',
              },
              {
                title: 'ORDERS',
                text: 'View and manage the orders of users',
              },
              {
                title: 'ANALYTICS',
                text: 'Monitor usage stats, trends, and system performance for better decision-making.',
              },
              {
                title: 'PROFILE',
                text: 'Update your profile, change settings, and manage your administrator account.',
              },
            ].map(({ title, text }) => (
              <div
                key={title}
                className="bg-orange-400 text-white rounded-lg shadow p-4 border border-white transform transition-transform duration-300 hover:scale-105"

              >
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          {/* Nested Routes */}
          <div className="mt-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Animation keyframe */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboardPage;
