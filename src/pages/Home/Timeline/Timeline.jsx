// Timeline.jsx
import React, { useState } from 'react';
import { TweetList } from '../../../components/Tweet/TweetList';
import CommentSection from '../../../components/Comment/CommentSection';
import SideBar from '../../../components/Navbar/SideBar';
import Footer from '../../../components/Footer/Footer';
import AllTweetList from '../../../components/Tweet/AllTweetList.jsx';

const Timeline = () => {
  const [selectedTweetId, setSelectedTweetId] = useState(null);

  const toggleComments = (tweetId) => {
    setSelectedTweetId((prevSelectedTweetId) => prevSelectedTweetId === tweetId ? null : tweetId);
  };

  return (
    <>
      <div className="container mx-auto pl-4 pr-4">
        <AllTweetList onToggleComments={toggleComments} />
        {selectedTweetId && <CommentSection tweetId={selectedTweetId} />}
      </div>
    </>
  );
};

export default Timeline;
