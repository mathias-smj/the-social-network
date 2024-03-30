import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Tweet from './Tweet';
import { useAuth } from '../../context/AuthContext/useAuth.js';
import { checkFollowingStatus, getFollowingTweets } from '../../api/models/followers.js';
import { TweetList } from './TweetList.jsx';

const AllTweetList = ({ userId, onToggleComments }) => {
  const [tweets, setTweets] = useState([]);
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        // Vérifier si l'utilisateur suit l'utilisateur dont les tweets sont affichés
        const followingStatus = await checkFollowingStatus(user.id, user.id); // Utilisez la fonction checkFollowingStatus
        setIsFollowing(followingStatus);

        // Si l'utilisateur est connecté et suit l'utilisateur dont les tweets sont affichés, récupérer et afficher les tweets
        if (user && isFollowing) {
          const tweetsData = await getFollowingTweets(user.id);
          // Trier les tweets par date de création
          tweetsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

          const formattedTweets = tweetsData.map(tweet => ({
            ...tweet,
            created_at: format(new Date(tweet.created_at), 'dd/MM/yyyy'),
          }));

          setTweets(formattedTweets);
        } else {
          // Si l'utilisateur ne suit pas l'utilisateur dont les tweets sont affichés, vider les tweets
          setTweets([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des tweets :', error);
      }
    };

    fetchTweets();
  }, [userId, user, isFollowing]);

  return (
    <>
    <TweetList />
    <div>
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweetId={tweet.id}
          userId={tweet.profile_id}
          avatar_url={tweet.profiles ? tweet.profiles.avatar_url : ''}
          username={tweet.profiles ? tweet.profiles.username : ''}
          createdAt={tweet.created_at}
          content={tweet.content}
          onToggleComments={onToggleComments}
        />
      ))}
    </div>
    </>
  );
};

export default AllTweetList;
