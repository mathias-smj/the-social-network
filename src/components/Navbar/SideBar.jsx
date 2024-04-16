import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/useAuth.js'; // Importer le hook useAuth depuis le contexte AuthContext
import { signOut } from '../../api/models/auth.js'; // Importer la fonction signOut depuis les modèles d'authentification
import { faHomeUser, faSignOut, faUserAstronaut, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
  const { user } = useAuth(); // Utiliser le hook useAuth pour obtenir les informations de l'utilisateur

  return (
    <aside
      id="default-sidebar"
      className="top-0 left-2 z-40 w-48 transition-transform -translate-x-full sm:translate-x-0 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg"
      style={{ height: 'calc(100vh - 100px)' }}
      aria-label="Sidebar"
    >
      <div className="py-4 overflow-y-auto">
        <ul className="space-y-2">
          {/* Lien vers la page d'accueil */}
          <li>
            <Link
              to={`/`}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon icon={faHomeUser} />
              <span className="ml-3">Accueil</span>
            </Link>
          </li>
          {/* Lien vers la page de profil */}
          <li>
            <Link
              to={`/edit-profil`}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon icon={faUserAstronaut} />
              <span className="ml-3">Profil</span>
            </Link>
          </li>
          {/* Lien vers la liste des followers */}
          <li>
            <Link
              to={`/followers-list`}
              className="w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FontAwesomeIcon icon={faUserFriends} />
              <span className="ml-3">Followers</span>
            </Link>
          </li>
          {/* Bouton de déconnexion */}
          <li>
            <Link to={`/signIn`}>
              <button
                onClick={signOut}
                className="w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faSignOut} />
                <span className="ml-3">Déconnexion</span>
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
