import { useEffect, useState } from 'react';
import { getComments, deleteComment } from '../../api/models/comments'; // Assurez-vous d'importer deleteComment
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentSection = ({ tweetId }) => {
  const [comments, setComments] = useState([]);

  // Utilisation de useEffect pour charger les commentaires une fois que le composant est monté ou que l'identifiant du tweet change
  useEffect(() => {
    const loadComments = async () => {
      const fetchedComments = await getComments(tweetId);
      setComments(fetchedComments);
    };
    loadComments();
  }, [tweetId]);

  // Fonction pour mettre à jour les commentaires après soumission d'un nouveau commentaire
  const onCommentSubmitted = async () => {
    const fetchedComments = await getComments(tweetId);
    setComments(fetchedComments);
  };

  // Fonction pour supprimer un commentaire
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
      {/* Affichage du formulaire de commentaire */}
      <CommentForm tweetId={tweetId} onCommentSubmitted={onCommentSubmitted} />
      {/* Affichage de chaque commentaire */}
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default CommentSection;
