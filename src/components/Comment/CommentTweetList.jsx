import React, { useEffect, useState } from 'react';
import { getCommentsForTweet, deleteComment } from '../../api/models/comments'; // Importer les fonctions pour récupérer les commentaires et supprimer un commentaire
import Comment from './Comment';
import CommentForm from './CommentForm.jsx';
import { useAuth } from '../../context/AuthContext/useAuth.js';

const CommentTweetList = ({ tweetId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const handleCommentUpdate = async (tweetId) => {
    const data= await getCommentsForTweet(tweetId);
    console.log('tweet Id : ', tweetId)
    console.log('data : ', data);
    return data;
  };

  useEffect(() => {
    handleCommentUpdate(tweetId).then((data) => {
      console.log(data);
      setComments(data);
    });
  }, []);

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <CommentForm tweetId={tweetId} onUpdateComments={() => handleCommentUpdate(tweetId)} />
      {comments && comments.map((comment) => (
        // eslint-disable-next-line no-undef
        <Comment key={comment.id} tweetId={tweetId} comment={comment} userId={user.id} username={comment.profiles.username} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default CommentTweetList;
