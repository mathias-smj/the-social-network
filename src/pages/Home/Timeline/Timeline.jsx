// Import des dépendances React nécessaires
import React, { useState } from 'react';

// Import des composants nécessaires
import { TweetList } from '../../../components/Tweet/TweetList';
import CommentSection from '../../../components/Comment/CommentSection';
import SideBar from '../../../components/Navbar/SideBar';
import Footer from '../../../components/Footer/Footer';
import AllTweetList from '../../../components/Tweet/AllTweetList.jsx';

// Définition du composant Timeline
const Timeline = () => {
  // Utilisation du hook useState pour gérer l'état du tweet sélectionné
  const [selectedTweetId, setSelectedTweetId] = useState(null);

  // Fonction pour basculer l'affichage des commentaires d'un tweet
  const toggleComments = (tweetId) => {
    setSelectedTweetId((prevSelectedTweetId) => prevSelectedTweetId === tweetId ? null : tweetId);
  };

  // Rendu du composant Timeline
  return (
    <>
      <div className="container mx-auto pl-4 pr-4">
        {/* Affichage de la liste de tous les tweets */}
        <AllTweetList onToggleComments={toggleComments} />
        {/* Affichage de la section des commentaires si un tweet est sélectionné */}
        {selectedTweetId && <CommentSection tweetId={selectedTweetId} />}
      </div>
    </>
  );
};

// Export du composant Timeline
export default Timeline;
