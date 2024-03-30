import { USER_PROFILE_TABLE } from '../../enums/tableNames.js';
import { supabaseClient } from '../utils/supabaseClient.js';

export const findProfileById = async userId => {
  const { data, error } = await supabaseClient.from(USER_PROFILE_TABLE).select('*').eq('id', userId);

  if (error) {
    throw error;
  }
  if (!data || !data.length) {
    throw new Error(`No user with id ${userId}`);
  }

  return data[0];
};

export const findProfileByUsername = async username => {
  const { data, error } = await supabaseClient.from(USER_PROFILE_TABLE).select('*').eq('username', username);

  if (error) {
    throw error;
  }
  if (!data || !data.length) {
    throw new Error(`No user with username ${username}`);
  }

  return data[0];
};

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