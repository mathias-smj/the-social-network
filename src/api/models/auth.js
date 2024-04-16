// Importation du client Supabase, du nom de la table utilisateur et de la fonction de vérification
import { supabaseClient } from '../utils/supabaseClient.js';
import { USER_PROFILE_TABLE } from '../../enums/tableNames.js';
import { validateSignUpData } from '../utils/verification.js';

// Fonction pour mettre à jour les données utilisateur dans la base de données
const update = async (user_id, value) => {
  try {
    // Utilisation de supabaseClient pour mettre à jour les données utilisateur
    const { data, error } = await supabaseClient
      .from(USER_PROFILE_TABLE)
      .update(value)
      .eq('id', user_id);
  } catch (error) {
    // Gestion des erreurs
    throw error;
  }
};

// Fonction pour l'inscription avec email et mot de passe
export const signUpWithPassword = async (username, email, password) => {
  try {
    // Vérification des données d'inscription
    if (!validateSignUpData({ username, email, password })) {
      throw new Error('Invalid input data');
    }
    // Inscription de l'utilisateur avec Supabase
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password
    });

    // Gestion des erreurs lors de l'inscription
    if (error) {
      return Promise.reject(error.message);
    }
    // Mise à jour du profil utilisateur avec le nom d'utilisateur
    await update(data.user.id, { username: username });
    return Promise.resolve(data.user);
  } catch (error) {
    // Gestion des erreurs
    throw error;
  }
};

// Fonction pour la connexion avec email et mot de passe
export const signInWithPassword = async (email, password) => {
  // Authentification de l'utilisateur avec Supabase
  const { error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });
  // Gestion des erreurs lors de la connexion
  if (error) {
    return Promise.reject(error);
  }
  // Résolution de la promesse si la connexion réussit
  return Promise.resolve(true);
};

// Fonction pour la déconnexion de l'utilisateur
export const signOut = async () => {
  // Déconnexion de l'utilisateur avec Supabase
  const { error } = await supabaseClient.auth.signOut();
  // Gestion des erreurs lors de la déconnexion
  if (error) {
    return Promise.reject(error);
  }
};
