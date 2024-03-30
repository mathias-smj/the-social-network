import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getTweetsByUserId, addTweet } from '../../api/models/tweets';
import Tweet from '../Tweet/Tweet';
import { useAuth } from '../../context/AuthContext/useAuth';
import { TweetForm } from './TweetForm';

export const TweetList = ({ onToggleComments }) => {
  const [tweets, setTweets] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const tweetsData = await getTweetsByUserId(user.id);
        const formattedTweets = tweetsData.map(tweet => ({
          ...tweet,
          created_at: format(new Date(tweet.created_at), 'dd/MM/yyyy'),
        }));
        setTweets(formattedTweets);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };
    fetchTweets();
  }, [user]);

  const handleAddTweet = async (newTweetContent) => {
    try {
      const newTweet = await addTweet(user.id, newTweetContent);
      setTweets(prevTweets => [...prevTweets, newTweet]);
    } catch (error) {
      console.error('Error adding tweet:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <TweetForm onAddTweet={handleAddTweet} />
      {tweets.map((tweet) => (
        <div key={tweet.id}>
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
