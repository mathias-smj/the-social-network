import React, { createContext, useState, useEffect } from 'react';
import { supabaseClient } from '../../api/utils/supabaseClient';

// Création du contexte d'authentification
export const AuthContext = createContext();

// Composant fournissant le contexte d'authentification à ses enfants
export const AuthProvider = ({ children }) => {
  // Déclaration des états pour gérer l'authentification et l'utilisateur
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authInProgress, setAuthInProgress] = useState(true);

  // Effet de montage pour écouter les changements d'état de l'authentification
  useEffect(() => {
    // Abonnement à l'événement onAuthStateChange de Supabase
    const { data } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      // Gestion des différents événements d'authentification
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        if (session.user) {
          setIsAuthenticated(true);
          setUser(session.user);
        };
      } else if (event === 'SIGNED_OUT') {
        ('signed out');
        setIsAuthenticated(false);
        setUser(null);
      }
      setAuthInProgress(false);
    });

    // Désabonnement de l'événement lors du démontage du composant
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  // Fourniture du contexte et de ses valeurs aux composants enfants
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, authInProgress }}>
      {children}
    </AuthContext.Provider>
  );
};
