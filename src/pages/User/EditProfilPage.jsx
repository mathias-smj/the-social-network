import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext/useAuth.js';
import { findProfileById, updateUserProfileInfo } from '../../api/models/profiles.js';
import InputField from '../Auth/InputField.jsx';

const EditProfileForm = () => {
  const { user, isAuthenticated } = useAuth();
  const [editedProfileInfo, setEditedProfileInfo] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      console.log("Utilisateur non authentifié ou objet 'user' non disponible, redirection...");
      return;
    }
    const fetchUserProfile = async () => {
      try {
        const profileInfo = await findProfileById(user.id);
        setEditedProfileInfo(profileInfo);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchUserProfile();
  }, [user, isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfileInfo({ ...editedProfileInfo, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfileInfo(user.id, editedProfileInfo);
      console.log('userId : ', user.id)
      console.log('updatedFields : ', editedProfileInfo)
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mx-auto pl-8">
      <div className="bg-white p-8 rounded-lg shadow-md flex">
        <div className="flex-none mr-8">
          <img src={'https://gem.ec-nantes.fr/wp-content/uploads/2019/01/profil-vide.png'} alt="Photo de profil" className="w-32 h-32 rounded-full" />
        </div>
        <div className="flex-grow">
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
          <button onClick={handleSaveProfile} className="bg-blue-500 text-white px-4 py-2 rounded-md">Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
