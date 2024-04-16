import React, { useState } from 'react';
import { addComment } from '../../api/models/comments'; // Importer la fonction d'ajout de commentaire
import { useAuth } from '../../context/AuthContext/useAuth'; // Importer le hook useAuth depuis le contexte AuthContext

export const CommentForm = ({ tweetId, onUpdateComments }) => {
  // Utiliser le hook useAuth pour obtenir les informations de l'utilisateur
  const { user } = useAuth();
  const [content, setContent] = useState('');

  // Fonction pour soumettre le commentaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!content) return;

    try {
      // Utiliser la fonction d'ajout de commentaire avec le vrai ID de l'utilisateur
      await addComment(tweetId, content, user.id);
      onUpdateComments(); // Appeler la fonction onUpdateComments pour mettre à jour les commentaires
      setContent(''); // Réinitialiser le contenu du commentaire après l'ajout
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* Zone de texte pour ajouter le commentaire */}
        <textarea
          className="border border-gray-300 rounded-lg p-2 w-full resize-none mb-4"
          rows="2"
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {/* Bouton de soumission du commentaire */}
        <button
          type="submit"
          className="self-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
