import React, { useState } from 'react';
import { addComment } from '../../api/models/comments'; // Importer la fonction d'ajout de commentaire
import { useAuth } from '../../context/AuthContext/useAuth';

export const CommentForm = ({ tweetId, onUpdateComments }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!content) return;

    try {
      await addComment(tweetId, content, user.id); // Utiliser la fonction d'ajout de commentaire avec le vrai ID de l'utilisateur
      onUpdateComments();
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <textarea
          className="border border-gray-300 rounded-lg p-2 w-full resize-none mb-4"
          rows="2"
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
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
