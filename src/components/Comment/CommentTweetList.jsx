import React, { useEffect, useState } from 'react';
import { getCommentsForTweet, deleteComment } from '../../api/models/comments'; // Importer les fonctions pour récupérer les commentaires et supprimer un commentaire
import Comment from './Comment';
import CommentForm from './CommentForm.jsx';
import { useAuth } from '../../context/AuthContext/useAuth.js';

const CommentTweetList = ({ tweetId }) => {
  const { user } = useAuth(); // Utilisation du hook useAuth pour obtenir les informations de l'utilisateur
  const [comments, setComments] = useState([]);

  // Fonction pour mettre à jour les commentaires
  const handleCommentUpdate = async (tweetId) => {
    const data= await getCommentsForTweet(tweetId);
    return data;
  };

  // Utilisation de useEffect pour charger les commentaires une fois que le composant est monté
  useEffect(() => {
    handleCommentUpdate(tweetId).then((data) => {
      setComments(data);
    });
  }, []);

  // Fonction pour supprimer un commentaire
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
      {/* Affichage du formulaire de commentaire */}
      <CommentForm tweetId={tweetId} onUpdateComments={() => handleCommentUpdate(tweetId)} />
      {/* Affichage de chaque commentaire */}
      {comments && comments.map((comment) => (
        <Comment key={comment.id} tweetId={tweetId} comment={comment} userId={user.id} username={comment.profiles.username} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default CommentTweetList;
