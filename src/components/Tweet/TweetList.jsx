import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getTweetsByUserId, addTweet } from '../../api/models/tweets'; // Importer les fonctions pour récupérer et ajouter des tweets depuis les modèles de tweets
import Tweet from '../Tweet/Tweet'; // Importer le composant Tweet
import { useAuth } from '../../context/AuthContext/useAuth'; // Importer le hook useAuth depuis le contexte AuthContext
import { TweetForm } from './TweetForm'; // Importer le composant TweetForm

export const TweetList = ({ onToggleComments }) => {
  const [tweets, setTweets] = useState([]); // État pour stocker les tweets
  const { user } = useAuth(); // Utilisation du hook useAuth pour récupérer l'utilisateur connecté

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        // Récupération des tweets de l'utilisateur connecté
        const tweetsData = await getTweetsByUserId(user.id);
        // Formatage des dates des tweets
        const formattedTweets = tweetsData.map(tweet => ({
          ...tweet,
          created_at: format(new Date(tweet.created_at), 'dd/MM/yyyy'),
        }));
        // Mise à jour de l'état des tweets
        setTweets(formattedTweets);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };
    fetchTweets();
  }, [user]); // Effectue le fetch des tweets à chaque changement de l'utilisateur

  // Fonction pour ajouter un nouveau tweet
  const handleAddTweet = async (newTweetContent) => {
    try {
      // Appel à la fonction addTweet pour ajouter un nouveau tweet dans la base de données
      const newTweet = await addTweet(user.id, newTweetContent);
      // Mise à jour de l'état des tweets pour inclure le nouveau tweet
      setTweets(prevTweets => [...prevTweets, newTweet]);
    } catch (error) {
      console.error('Error adding tweet:', error);
    }
  };

  // Si l'utilisateur n'est pas encore chargé, afficher "Loading..."
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Composant TweetForm pour permettre à l'utilisateur d'ajouter de nouveaux tweets */}
      <TweetForm onAddTweet={handleAddTweet} />
      {/* Affichage de la liste des tweets */}
      {tweets.map((tweet) => (
        <div key={tweet.id}>
          {/* Composant Tweet pour afficher chaque tweet */}
          <Tweet
            userId={user.id}
            tweetId={tweet.id}
            avatar_url={tweet.profiles.avatar_url}
            username={tweet.profiles.username}
            createdAt={tweet.created_at}
            content={tweet.content}
            onToggleComments={onToggleComments}
          />
        </div>
      ))}
    </div>
  );
};
