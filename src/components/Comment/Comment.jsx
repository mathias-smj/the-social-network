import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteComment } from '../../api/models/comments.js';
import { Link } from 'react-router-dom'; // Importez Link depuis react-router-dom

const Comment = ({ comment, userId, username }) => {
  // État pour contrôler l'affichage de la modal de suppression
  const [showModal, setShowModal] = useState(false);

  // Fonction pour gérer la suppression du commentaire
  const handleDelete = async () => {
    await deleteComment(comment.id);
    setShowModal(false);
  };

  return (
    <div className="bg-gray-100 p-2 rounded-lg shadow-md mb-2">
      <div className="flex items-center mb-2">
        {/* Lien pour rediriger vers le profil de l'utilisateur */}
        <Link to={`/profil/${userId}`} className="font-semibold">
          {username}
        </Link>
        <p className="text-gray-600 text-xs ml-2">{comment.date}</p>
        {/* Bouton pour afficher la modal de suppression */}
        <button onClick={() => setShowModal(true)} className="ml-auto text-red-500 hover:text-red-700">
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
      <p className="text-gray-800">{comment.content}</p>

      {/* Modal de suppression du commentaire */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Supprimer le commentaire</p>
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce commentaire ?</p>
            <div className="flex justify-end">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2" onClick={handleDelete}>
                Supprimer
              </button>
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg" onClick={() => setShowModal(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
