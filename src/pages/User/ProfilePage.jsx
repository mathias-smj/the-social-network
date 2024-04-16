import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findProfileById } from '../../api/models/profiles.js';
import SideBar from '../../components/Navbar/SideBar.jsx';

const ProfilePage = () => {
  // Récupération de l'ID de l'utilisateur depuis les paramètres de l'URL
  const { userId } = useParams();
  // Déclaration d'un état local pour stocker les informations du profil de l'utilisateur
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  // Utilisation du hook useEffect pour effectuer une action après le rendu initial du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les informations du profil de l'utilisateur
    const fetchUserProfile = async () => {
      try {
        // Appel à la fonction API pour trouver le profil par l'identifiant de l'utilisateur
        const profileInfo = await findProfileById(userId);
        // Mise à jour de l'état local avec les informations du profil récupérées
        setUserProfileInfo(profileInfo);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    // Appel de la fonction pour récupérer le profil de l'utilisateur
    fetchUserProfile();
  }, [userId]); // Déclenchement de l'effet uniquement lorsque 'userId' change

  // Rendu du composant ProfilePage
  return (
    <div className="container mx-auto py-8">
      <div className="bg-white p-8 rounded-lg shadow-md flex">
        <div className="flex-none mr-8">
          <img src={'https://gem.ec-nantes.fr/wp-content/uploads/2019/01/profil-vide.png'} alt="Photo de profil" className="w-32 h-32 rounded-full" />
        </div>
        <div className="flex-grow">
          {/* Affichage des informations du profil de l'utilisateur */}
          <h1 className="text-2xl font-bold mb-4">{userProfileInfo ? userProfileInfo.username : 'Chargement...'}</h1>
          <p className="text-gray-600 mb-4">{userProfileInfo ? userProfileInfo.full_name : 'Chargement...'}</p>
          <p className="text-gray-600 mb-4">{userProfileInfo ? userProfileInfo.website : 'Chargement...'}</p>
          <p className="text-gray-600 mb-4">{userProfileInfo ? userProfileInfo.bio : 'Chargement...'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
