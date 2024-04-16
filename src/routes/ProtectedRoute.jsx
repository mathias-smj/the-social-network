import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext/AuthContext.jsx'; // Importation du contexte d'authentification

const ProtectedRoute = ({ children }) => {
  // Utilisation du hook useContext pour accéder au contexte d'authentification
  const { isAuthenticated, authInProgress } = useContext(AuthContext);

  // Vérification de l'état de l'authentification en cours
  if (authInProgress) {
    return <div>Chargement de l'authentification...</div>;
  }

  // Vérification si l'utilisateur est authentifié
  // Renvoie les enfants (contenu protégé) s'il est authentifié, sinon redirige vers la page de connexion
  return isAuthenticated ? children : <Navigate to="/signIn" replace />;
};

export default ProtectedRoute;
