// Importations du client Supabase et des noms de table
import { supabaseClient } from '../utils/supabaseClient.js';
import { TWEETS_TABLE, USER_PROFILE_TABLE } from '../../enums/tableNames.js';

// Fonction pour obtenir un tweet par son ID
export const getTweetsById = async (id) => {
  try {
    // Récupère le tweet avec les détails du profil utilisateur (nom d'utilisateur, avatar, date de création)
    const { data, error } = await supabaseClient
      .from(TWEETS_TABLE)
      .select(`*, profiles(username, avatar_url, created_at)`)
      .eq('id', id);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error(`Erreur lors de la récupération du tweet : ${error.message}`);
  }
};

// Fonction pour obtenir les tweets par ID d'utilisateur
export const getTweetsByUserId = async (id) => {
  try {
    // Récupère les tweets de l'utilisateur avec les détails du profil utilisateur (nom d'utilisateur, avatar)
    const { data, error } = await supabaseClient
      .from(TWEETS_TABLE)
      .select(`*, profiles(username, avatar_url)`)
      .eq('profile_id', id);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error(`Erreur lors de la récupération des tweets : ${error.message}`);
  }
};

// Fonction pour obtenir tous les tweets avec les détails du profil utilisateur (nom d'utilisateur, avatar)
export const getAllTweets = async () => {
  try {
    const { data, error } = await supabaseClient
      .from(TWEETS_TABLE)
      .select(`*, profiles(username, avatar_url)`);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des tweets :', error.message);
  }
}


// Fonction pour ajouter un tweet
export const addTweet = async (content) => {
  try {
    // Insère un nouveau tweet avec le contenu spécifié
    const { error } = await supabaseClient
      .from(TWEETS_TABLE)
      .insert([{ content: content }]);

    if (error) {
      throw error;
    }

  } catch (error) {
    console.error(`Erreur lors de l'ajout du tweet : ${error.message}`);
  }
};

// Fonction pour supprimer un tweet par son ID
export const deleteTweet = async (tweetId) => {
  try {
    // Supprime le tweet avec l'ID spécifié
    const { error } = await supabaseClient
      .from(TWEETS_TABLE)
      .delete()
      .eq('id', tweetId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du tweet :', error);
    return false;
  }
};

// Fonction pour obtenir les derniers tweets d'un utilisateur avec une limite spécifiée
export const getLatestTweetsByUserId = async (userId, limit) => {
  try {
    // Récupère les derniers tweets de l'utilisateur spécifié, triés par date de création
    const { data: tweets, error } = await supabase
      .from(TWEETS_TABLE)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }
    return tweets;
  } catch (error) {
    console.error('Erreur lors de la récupération des derniers tweets :', error.message);
  }
};
