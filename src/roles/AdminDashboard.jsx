import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ul className="list-disc list-inside">
        <li>Manage Users</li>
        <li>Review Reports</li>
        <li>Access System Settings</li>
      </ul>
    </div>
  );
};

export default AdminDashboard;