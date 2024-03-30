import { supabaseClient } from '../utils/supabaseClient.js';
import { TWEETS_TABLE, USER_PROFILE_TABLE } from '../../enums/tableNames.js';

export const getTweetsById = async (id) => {
  try {
    const { data, error } = await supabaseClient
      .from(TWEETS_TABLE)
      .select(`*, profiles(username, avatar_url, created_at)`)
      .eq('id', id);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error(`Erreur lors de la récuperation du tweet: ${error.message}`);
  }
};

export const getTweetsByUserId = async (id) => {
  try {
    const { data, error } = await supabaseClient
      .from(TWEETS_TABLE)
      .select(`*, profiles(username, avatar_url)`)
      .eq('profile_id', id);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error(`Erreur lors de la récuperation du tweet: ${error.message}`);
  }
};

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


export const addTweet = async (content) => {
  try {
    const { error } = await supabaseClient
      .from(TWEETS_TABLE)
      .insert([{ content: content }]);

    if (error) {
      throw error;
    }

  } catch (error) {
    console.error(`Erreur lors de l ajout du tweet: ${error.message}`);
  }
};

export const deleteTweet = async (tweetId) => {
  try {
    const { error } = await supabaseClient
      .from(TWEETS_TABLE)
      .delete()
      .eq('id', tweetId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting tweet:', error);
    return false;
  }
};

export const getLatestTweetsByUserId = async (userId, limit) => {
  try {
    // Récupérez les derniers tweets de l'utilisateur spécifié à partir de la table des tweets
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


