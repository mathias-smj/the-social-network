// Importations des noms de table et du client Supabase
import { FOLLOWERS_TABLE, TWEETS_TABLE } from '../../enums/tableNames.js';
import { supabaseClient } from '../utils/supabaseClient.js';

// Fonction pour ajouter un suiveur
export const addFollower = async (followingId) => {
  try {
    // Insère une nouvelle entrée dans la table des suiveurs avec l'ID de l'utilisateur suivi
    const { data, error } = await supabaseClient
      .from(FOLLOWERS_TABLE)
      .insert([{ following_id: followingId }]);

    if (error) throw error;

    return true; // Indique que l'ajout a été effectué avec succès
  } catch (error) {
    console.error('Erreur lors de l ajout du suiveur :', error.message);
  }
};

// Fonction pour supprimer un suiveur
export const deleteFollower = async (followingId) => {
  try {
    // Supprime l'entrée correspondante dans la table des suiveurs
    await supabaseClient
      .from(FOLLOWERS_TABLE)
      .delete()
      .eq('following_id', followingId);

    return true; // Indique que la suppression a été effectuée avec succès
  } catch (error) {
    console.error('Erreur lors de la suppression du suiveur :', error.message);
    return false; // Indique qu'une erreur s'est produite lors de la suppression
  }
};

// Fonction pour obtenir les suiveurs d'un utilisateur
export const getFollowers = async (userId) => {
  try {
    // Récupère les suiveurs de l'utilisateur donné
    const { data, error } = await supabaseClient
      .from(FOLLOWERS_TABLE)
      .select('*')
      .eq('profile_id', userId);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des suiveurs :', error.message);
  }
};

// Fonction pour obtenir les utilisateurs suivis par un utilisateur
export const getFollowing = async (userId) => {
  try {
    // Récupère les utilisateurs suivis par l'utilisateur donné
    const { data, error } = await supabaseClient
      .from(FOLLOWERS_TABLE)
      .select('*')
      .eq('following_id', userId);

    if (error) throw error;

    return data || [];
  } catch (error) {
    throw new Error('Erreur lors de la récupération des utilisateurs suivis :', error.message);
  }
};

// Fonction pour vérifier le statut de suivi entre deux utilisateurs
export const getFollowingStatus = async (followingId, userId) => {
  try {
    // Vérifie si l'utilisateur donné suit l'utilisateur cible
    const { data: followers, error } = await supabaseClient
      .from(FOLLOWERS_TABLE)
      .select('id')
      .eq('profile_id', userId)
      .eq('following_id', followingId);

    if (error) throw error;

    return !!followers; // Renvoie true si l'utilisateur est suivi, sinon false
  } catch (error) {
    console.error('Erreur lors de la vérification du statut de suivi :', error.message);
    return false;
  }
};

// Fonction pour vérifier le statut de suivi entre deux utilisateurs
export const checkFollowingStatus = async (userId, followingId) => {
  try {
    // Vérifie si l'utilisateur donné suit l'utilisateur cible
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

// Fonction pour obtenir les tweets des utilisateurs suivis par un utilisateur donné
export const getFollowingTweets = async (userId) => {
  try {
    // Récupère les utilisateurs suivis par l'utilisateur donné
    const { data: followingUsers, error: followingError } = await supabaseClient
      .from(FOLLOWERS_TABLE)
      .select('following_id')
      .eq('profile_id', userId);

    if (followingError) throw followingError;

    const followingUserIds = followingUsers.map(user => user.following_id);

    // Récupère les tweets des utilisateurs suivis en effectuant une jointure avec la table des profils
    const { data: tweets, error: tweetsError } = await supabaseClient
      .from(TWEETS_TABLE)
      .select(`*, profiles(username, avatar_url)`)
      .in('profile_id', followingUserIds)
      .order('created_at', { ascending: false });

    if (tweetsError) throw tweetsError;

    return tweets || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des tweets des utilisateurs suivis :', error.message);
    return null;
  }
};
