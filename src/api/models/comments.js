// Importations des utilitaires et des noms de table
import { supabaseClient } from '../utils/supabaseClient.js';
import { COMMENTS_TWEETS_TABLE, TWEETS_TABLE } from '../../enums/tableNames.js';

// Fonction pour obtenir les commentaires pour un tweet donné
export const getComments = async tweetId => {
  try {
    // Récupère les commentaires associés au tweet, triés par date de création
    const { data, error } = await supabaseClient.from(COMMENTS_TWEETS_TABLE).select('*').eq('tweet_id', tweetId).order('created_at', { ascending: false });
    return data || []; // Renvoie les données des commentaires ou un tableau vide en cas d'absence de données
  } catch (error) {
    console.error(`Erreur lors de la récupération des commentaires : ${error.message}`);
  }
};

// Fonction pour ajouter un commentaire à un tweet
export const addComment = async (tweetId, content, userId) => {
  try {
    // Insère un nouveau commentaire dans la table des commentaires tweets
    const { error } = await supabaseClient.from(COMMENTS_TWEETS_TABLE).insert([{ tweet_id: tweetId, content: content, profile_id: userId, created_at: new Date() }]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(`Erreur lors de l'ajout du commentaire : ${error.message}`);
  }
};

// Fonction pour supprimer un commentaire
export async function deleteComment(commentId) {
  try {
    // Supprime l'entrée correspondante dans la table des commentaires tweets
    await supabaseClient.from('tweets_comments').delete().eq('comment_id', commentId);
    // Supprime le commentaire de la table des commentaires
    await supabaseClient.from('comments').delete().eq('id', commentId);
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire :', error.message);
  }
}

// Fonction pour obtenir les commentaires pour un tweet donné, incluant les profils associés
export async function getCommentsForTweet(tweetId) {
  try {
    // Récupère les commentaires pour le tweet donné, avec les profils associés
    const { data: tweetComments, error: tweetCommentsError } = await supabaseClient
      .from(COMMENTS_TWEETS_TABLE)
      .select(`*, profiles(username)`)
      .eq('tweet_id', tweetId);

    if (tweetCommentsError) {
      console.error(tweetCommentsError.message)
      throw new Error(tweetCommentsError.message);
    }

    return tweetComments;
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires :', error.message);
    return [];
  }
}
