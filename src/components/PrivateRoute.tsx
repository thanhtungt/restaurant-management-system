import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User } from '../types/user';

interface PrivateRouteProps {
  allowedRoles?: Array<User['role']>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { authState } = useAuth();
  const { isAuthenticated, user, loading } = authState;

  // If auth is still loading, you might want to show a loading spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if the user is authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is provided, check if the user has the required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to a different page based on role
    const redirectPath = user.role === 'admin' ? '/dashboard' : '/tables';
    return <Navigate to={redirectPath} replace />;
  }

  // If all checks pass, render the child routes
  return <Outlet />;
};

export default PrivateRoute;