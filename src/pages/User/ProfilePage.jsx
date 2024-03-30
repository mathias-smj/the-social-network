import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findProfileById } from '../../api/models/profiles.js';
import SideBar from '../../components/Navbar/SideBar.jsx';

const ProfilePage = () => {
  // console.log("ProfilePage userId:", userId);
  const { userId } = useParams()
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileInfo = await findProfileById(userId);
        // console.log("Fetching profile for userId:", userId);
        setUserProfileInfo(profileInfo);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchUserProfile();
  }, [userId]);

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white p-8 rounded-lg shadow-md flex">
        <div className="flex-none mr-8">
          <img src={'https://gem.ec-nantes.fr/wp-content/uploads/2019/01/profil-vide.png'} alt="Photo de profil" className="w-32 h-32 rounded-full" />
        </div>
        <div className="flex-grow">
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
