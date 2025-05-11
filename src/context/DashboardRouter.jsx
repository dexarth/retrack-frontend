import React from 'react';
import { useAuth } from './AuthContext';
import AdminDashboard from '../roles/AdminDashboard';
import MentorDashboard from '../roles/MentorDashboard';
import MenteeDashboard from '../roles/MenteeDashboard';

const DashboardRouter = () => {
  const { role } = useAuth();

  if (!role) return <p>Loading role info...</p>;

  switch (role) {
    case 'admin':
      return <AdminDashboard />;
    case 'mentor':
      return <MentorDashboard />;
    case 'mentee':
      return <MenteeDashboard />;
    default:
      return <p>You have not been assigned a role.</p>;
  }
};

export default DashboardRouter;