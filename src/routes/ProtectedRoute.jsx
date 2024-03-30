import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext/AuthContext.jsx'; // Assurez-vous que le chemin est correct

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authInProgress } = useContext(AuthContext);

  if (authInProgress) {
    return <div>Chargement de l'authentification...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/signIn" replace />;
};

export default ProtectedRoute;
