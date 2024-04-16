import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext/useAuth.js';
import { findProfileById, updateUserProfileInfo } from '../../api/models/profiles.js';
import InputField from '../Auth/InputField.jsx';

const EditProfileForm = () => {
  // Utilisation du hook useAuth pour récupérer les informations de l'utilisateur authentifié
  const { user, isAuthenticated } = useAuth();
  // Déclaration d'un état local pour stocker les informations éditées du profil
  const [editedProfileInfo, setEditedProfileInfo] = useState(null);

  // Utilisation du hook useEffect pour effectuer une action après le rendu initial du composant
  useEffect(() => {
    // Vérification de l'authentification de l'utilisateur et de la disponibilité de l'objet 'user'
    if (!isAuthenticated || !user) {
      console.log("Utilisateur non authentifié ou objet 'user' non disponible, redirection...");
      return;
    }
    // Fonction asynchrone pour récupérer les informations du profil de l'utilisateur
    const fetchUserProfile = async () => {
      try {
        // Appel à la fonction API pour trouver le profil par l'identifiant de l'utilisateur
        const profileInfo = await findProfileById(user.id);
        // Mise à jour de l'état local avec les informations du profil récupérées
        setEditedProfileInfo(profileInfo);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    // Appel de la fonction pour récupérer le profil de l'utilisateur
    fetchUserProfile();
  }, [user, isAuthenticated]); // Déclenchement de l'effet uniquement lorsque 'user' ou 'isAuthenticated' change

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Mise à jour de l'état local avec les nouvelles valeurs
    setEditedProfileInfo({ ...editedProfileInfo, [name]: value });
  };

  // Fonction pour enregistrer les modifications du profil
  const handleSaveProfile = async () => {
    try {
      // Appel à la fonction API pour mettre à jour les informations du profil de l'utilisateur
      await updateUserProfileInfo(user.id, editedProfileInfo);
      // Affichage des informations mises à jour dans la console
      console.log('userId : ', user.id)
      console.log('updatedFields : ', editedProfileInfo)
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Rendu du composant EditProfileForm
  return (
    <div className="container mx-auto pl-8">
      <div className="bg-white p-8 rounded-lg shadow-md flex">
        <div className="flex-none mr-8">
          <img src={'https://gem.ec-nantes.fr/wp-content/uploads/2019/01/profil-vide.png'} alt="Photo de profil" className="w-32 h-32 rounded-full" />
        </div>
        <div className="flex-grow">
          {/* Champs de formulaire pour modifier le nom d'utilisateur, le nom complet, le site web et la bio */}
          <InputField
            id={'username'}
            name={'username'}
            type={'text'}
            placeholder="Nom d'utilisateur"
            value={editedProfileInfo ? editedProfileInfo.username : ''}
            onChange={handleInputChange}
            className="mb-4"
          />
          <InputField
            id={'full_name'}
            name={'full_name'}
            type={'text'}
            placeholder="Nom et prénom"
            value={editedProfileInfo ? editedProfileInfo.full_name : ''}
            onChange={handleInputChange}
            className="mb-4"
          />
          <InputField
            id={'website'}
            name={'website'}
            type={'text'}
            placeholder="Lien site web"
            value={editedProfileInfo ? editedProfileInfo.website : ''}
            onChange={handleInputChange}
            className="mb-4"
          />
          <textarea
            id={'bio'}
            name="bio"
            placeholder="Bio"
            value={editedProfileInfo ? editedProfileInfo.bio : ''}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
          />
          {/* Bouton pour enregistrer les modifications du profil */}
          <button onClick={handleSaveProfile} className="bg-blue-500 text-white px-4 py-2 rounded-md">Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
