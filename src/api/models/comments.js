import { supabaseClient } from '../utils/supabaseClient.js';
import { COMMENTS_TWEETS_TABLE, TWEETS_TABLE } from '../../enums/tableNames.js';

export const getComments = async tweetId => {
  try {
    const { data, error } = await supabaseClient.from(COMMENTS_TWEETS_TABLE).select('*').eq('tweet_id', tweetId).order('created_at', { ascending: false });
    return data || [];
  } catch (error) {
    console.error(`Error fetching comments: ${error.message}`);
  }
};

export const addComment = async (tweetId, content, userId) => {
  console.log('tweet id : ' , tweetId)
  console.log('content : ' , content)

  try {
    const { error } = await supabaseClient.from(COMMENTS_TWEETS_TABLE).insert([{ tweet_id: tweetId, content: content, profile_id: userId, created_at: new Date() }]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(`Erreur lors de l ajout du commentaire: ${error.message}`);
  }
};

export async function deleteComment(commentId) {
  try {
    // Supprimer l'entrée correspondante dans la table de liaison tweets_comments
    await supabaseClient
      .from('tweets_comments')
      .delete()
      .eq('comment_id', commentId);

    // Supprimer le commentaire de la table des commentaires
    await supabaseClient
      .from('comments')
      .delete()
      .eq('id', commentId);

    console.log('Commentaire supprimé avec succès !');
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire :', error.message);
  }
}

export async function getCommentsForTweet(tweetId) {
  try {
    const { data: tweetComments, error: tweetCommentsError } = await supabaseClient
      .from(COMMENTS_TWEETS_TABLE)
      .select(`*, profiles(username)`)
      .eq('tweet_id', tweetId);

    // console.log('tweet comments', tweetComments)

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