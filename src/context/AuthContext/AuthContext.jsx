import React, { createContext, useState, useEffect } from 'react';
import { supabaseClient } from '../../api/utils/supabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authInProgress, setAuthInProgress] = useState(true);

  useEffect(() => {
    const { data } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        if (session.user) {
          setIsAuthenticated(true);
          setUser(session.user);
        };
      } else if (event === 'SIGNED_OUT') {
        console.log('signed out');
        setIsAuthenticated(false);
        setUser(null);
      }
      setAuthInProgress(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, authInProgress }}>
      {children}
    </AuthContext.Provider>
  );
};
