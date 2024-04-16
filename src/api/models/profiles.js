// Importation du nom de la table utilisateur et du client Supabase
import { USER_PROFILE_TABLE } from '../../enums/tableNames.js';
import { supabaseClient } from '../utils/supabaseClient.js';

// Fonction pour trouver un profil par ID d'utilisateur
export const findProfileById = async userId => {
  const { data, error } = await supabaseClient.from(USER_PROFILE_TABLE).select('*').eq('id', userId);

  if (error) {
    throw error;
  }
  if (!data || !data.length) {
    throw new Error(`Aucun utilisateur avec l'ID ${userId}`);
  }

  return data[0];
};

// Fonction pour trouver un profil par nom d'utilisateur
export const findProfileByUsername = async username => {
  const { data, error } = await supabaseClient.from(USER_PROFILE_TABLE).select('*').eq('username', username);

  if (error) {
    throw error;
  }
  if (!data || !data.length) {
    throw new Error(`Aucun utilisateur avec le nom d'utilisateur ${username}`);
  }

  return data[0];
};

// Fonction pour obtenir les informations de profil utilisateur
export const getUserProfileInfo = async username => {
  try {
    const { data, error } = await supabaseClient
      .from(USER_PROFILE_TABLE)
      .select('*')
      .eq('username', username)

    if (error) {
      throw error
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error(error.message);
  }
}

// Fonction pour obtenir le profil utilisateur actuellement connecté
export const getUserProfile = async () => {
  const user = supabaseClient.auth.user();

  if (!user) {
    throw new Error('Utilisateur non connecté');
  }

  const { data , error } = supabaseClient
    .from(USER_PROFILE_TABLE)
    .select('username')
    .eq('id', user.id)
    .single();

  if (error) {
    throw error;
  }
  return data;

}

// Fonction pour obtenir tous les utilisateurs
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabaseClient
      .from(USER_PROFILE_TABLE)
      .select('*');

    if (error) {
      throw new Error('Erreur lors de la récupération des utilisateurs :', error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Fonction pour mettre à jour les informations du profil utilisateur
export const updateUserProfileInfo = async (userId, updatedFields) => {
  try {
    const { data, error } = await supabaseClient
      .from(USER_PROFILE_TABLE)
      .update(updatedFields)
      .eq('id', userId);

    if (error) {
      throw new Error('Erreur lors de la mise à jour du profil utilisateur :', error.message);
    }

    return data;
  } catch (error) {
    throw error;
  };

}
