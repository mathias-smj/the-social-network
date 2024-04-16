import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { deleteTweet } from '../../api/models/tweets.js';
import { useAuth } from '../../context/AuthContext/useAuth.js';
import CommentForm from '../Comment/CommentForm.jsx';
import CommentTweetList from '../Comment/CommentTweetList.jsx';

const Tweet = ({ tweetId, userId, avatar_url, username, createdAt, content, onDelete }) => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleClickDelete = async () => {
    try {
      await deleteTweet(tweetId);
      setShowModal(false);
      onDelete(tweetId); // Appel de la fonction onDelete pour supprimer le tweet de la liste parente
    } catch (error) {
      console.error('Error deleting tweet:', error);
    }
  };

  return (
    <div className="container mx-auto pb-8">
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex">
        <div className="mr-4">
          <img src={avatar_url} alt="Profile" className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex-grow">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                <Link to={`/profil/${userId}`}>{username}</Link>
              </h2>
              <p className="text-gray-600 text-sm">{createdAt}</p>
            </div>
          </div>
          <p className="text-gray-800 mb-4">{content}</p>
          <div className="flex items-center">
            {/* Bouton de suppression du tweet (affiché uniquement si l'utilisateur est l'auteur du tweet) */}
            {user && user.id === userId && (
              <button className="text-gray-500 hover:text-red-700" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            )}
            {/* Bouton pour afficher/masquer le formulaire de commentaire */}
            <button className="text-blue-500 hover:text-blue-700 ml-4" onClick={() => setShowCommentForm(!showCommentForm)}>
              <FontAwesomeIcon icon={faComment} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression du tweet */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Êtes-vous sûr de vouloir supprimer ce tweet ?</p>
            <div className="flex justify-end">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2" onClick={handleClickDelete}>
                Supprimer
              </button>
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg" onClick={() => setShowModal(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Affichage du formulaire de commentaire */}
      {showCommentForm && <CommentForm tweetId={tweetId} />}
      {/* Affichage de la liste des commentaires */}
      <CommentTweetList tweetId={tweetId} />
    </div>
  );
};

export default Tweet;
