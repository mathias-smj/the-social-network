import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/models/profiles.js'; // Importer la fonction pour récupérer tous les utilisateurs
import { useAuth } from '../../context/AuthContext/useAuth.js';
import { addFollower, deleteFollower, checkFollowingStatus } from '../../api/models/followers.js'; // Importer les fonctions pour suivre ou ne plus suivre un utilisateur
import AllTweetList from '../Tweet/AllTweetList.jsx';
import SideBar from '../Navbar/SideBar.jsx';

function FollowersList() {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  // Utilisation de useEffect pour charger tous les utilisateurs, à l'exception de l'utilisateur actuel
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        const filteredUsers = data.filter(userData => userData.id !== user.id);
        setUsers(filteredUsers);
      } catch(error) {
        throw new Error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, [user]);

  // Utilisation de useEffect pour vérifier si l'utilisateur connecté suit déjà l'utilisateur sélectionné
  useEffect(() => {
    const checkFollowing = async () => {
      if (user && selectedUser) {
        const followingStatus = await checkFollowingStatus(selectedUser, user.id);
        setIsFollowing(followingStatus);
      }
    }
    checkFollowing();
  }, [selectedUser, user]);

  // Fonction pour suivre ou ne plus suivre un utilisateur
  const handleFollow = async (userId) => {
    if (!isFollowing) {
      await addFollower(userId, user.id);
      localStorage.setItem('followedUserId', user.id);
      setSelectedUser(userId);
      setIsFollowing(true);
    } else {
      try {
        await deleteFollower(userId);
        localStorage.removeItem('followedUserId');
        setSelectedUser(null);
        setIsFollowing(false);
      } catch(error) {
        console.error('Error unfollowing user:', error);
      }
    }
  };

  return (
    <>
      {/* Conteneur pour afficher la liste des utilisateurs */}
      <div className="container mx-auto pb-8 pl-8">
        <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className={`bg-gray-100 p-4 rounded-lg shadow-md mb-2 ${selectedUser === user.id ? 'bg-green-100' : ''}`} onClick={() => setSelectedUser(user.id)}>
              <div className="flex items-center justify-between py-2">
                <span className="text-lg">{user.username}</span>
                {/* Bouton pour suivre ou ne plus suivre un utilisateur */}
                {user && (
                  <button
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ${selectedUser === user.id && isFollowing ? 'bg-red-500' : 'bg-blue-500'}`}
                    onClick={(e) => { e.stopPropagation(); handleFollow(user.id)}}
                  >
                    {selectedUser === user.id && isFollowing ? 'Ne plus suivre' : 'Suivre'}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FollowersList;
