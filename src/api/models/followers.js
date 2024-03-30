import { FOLLOWERS_TABLE, TWEETS_TABLE } from '../../enums/tableNames.js';
import { supabaseClient } from '../utils/supabaseClient.js';

export const addFollower = async (followingId) => {
  try {
    const { data, error } = await supabaseClient
      .from(FOLLOWERS_TABLE)
      .insert([{ following_id: followingId }]);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error adding follower:', error.message);
  }
};

// create a function where you can delete a follower
export const deleteFollower = async (followingId) => {
  try {
    await supabaseClient
      .from(FOLLOWERS_TABLE)
      .delete()
      .eq('following_id', followingId);

    return true; // Indique que la suppression a été effectuée avec succès
  } catch (error) {
    console.error('Error deleting follower:', error.message);
    return false; // Indique qu'une erreur s'est produite lors de la suppression
  }
};


export const getFollowers = async (userId) => {
  try {
    const { data, error } = await supabaseClient
      .from(FOLLOWERS_TABLE)
      .select('*')
      .eq('profile_id', userId);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error getting followers:', error.message);
  }
};

export const getFollowing = async (userId) => {
  try {
    const { data, error } = await supabaseClient
      .from(FOLLOWERS_TABLE)
      .select('*')
      .eq('following_id', userId);

    if (error) throw error;

    return data || [];
  } catch (error) {
    throw new Error('Error getting following:', error.message);
  }
};

export const getFollowingStatus = async (followingId, userId) => {
  try {
    const { data: followers, error } = await supabaseClient
      .from(FOLLOWERS_TABLE)
      .select('id')
      .eq('profile_id', userId)
      .eq('following_id', followingId);

    if (error) {
      throw error;
    }

    return !!followers; // Renvoie true si l'utilisateur est suivi, sinon false
  } catch (error) {
    console.error('Error checking following status:', error.message);
    return false;
  }
};

export const checkFollowingStatus = async (userId, followingId) => {
  try {
    const { data: followingData, error: followingError } = await supabaseClient
      .from('followers')
      .select()
      .eq('profile_id', userId)
      .eq('following_id', followingId)

    if (followingError) {
      throw followingError;
    }
    return followingData !== null;
  } catch (error) {
    console.error('Erreur lors de la vérification du statut de suivi :', error.message);
    return false;
  }
};

// Récuperer tout les utilisateurs que je suis
// Si l'utilisateur est dans ma liste d'utilisateur suivi j'affiche le button ne plus suivre

// getAllFOllowingUsers

export const getFollowingTweets = async (userId) => {
  try {
    // Récupérer les utilisateurs suivis par l'utilisateur donné
    const { data: followingUsers, error: followingError } = await supabaseClient
      .from(FOLLOWERS_TABLE)
      .select('following_id')
      .eq('profile_id', userId);

    if (followingError) {
      throw followingError;
    }

    const followingUserIds = followingUsers.map(user => user.following_id);

    // Récupérer les tweets des utilisateurs suivis en effectuant une jointure avec la table des profils
    const { data: tweets, error: tweetsError } = await supabaseClient
      .from(TWEETS_TABLE)
      .select(`*, profiles(username, avatar_url)`) // Sélectionner les tweets avec les profils associés
      .in('profile_id', followingUserIds) // Utilisez l'opérateur in avec les ID des utilisateurs suivis
      .order('created_at', { ascending: false });

    if (tweetsError) {
      throw tweetsError;
    }

    return tweets || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des tweets des utilisateurs suivis :', error.message);
    return null;
  }
}



