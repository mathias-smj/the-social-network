import { useEffect, useState } from 'react';
import { getComments, deleteComment } from '../../api/models/comments'; // Assurez-vous d'importer deleteComment
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentSection = ({ tweetId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      const fetchedComments = await getComments(tweetId);
      setComments(fetchedComments);
    };
    loadComments();
  }, [tweetId]);

  const onCommentSubmitted = async () => {
    const fetchedComments = await getComments(tweetId);
    setComments(fetchedComments);
  };

  const handleDelete = async (commentId) => {
    // Appel à la fonction deleteComment pour supprimer le commentaire de la base de données
    const response = await deleteComment(commentId);
    if (response) {
      // Mise à jour des commentaires pour retirer le commentaire supprimé sans recharger tous les commentaires depuis le serveur
      setComments(currentComments => currentComments.filter(comment => comment.id !== commentId));
    }
  };

  return (
    <div>
      <CommentForm tweetId={tweetId} onCommentSubmitted={onCommentSubmitted} />
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default CommentSection;
