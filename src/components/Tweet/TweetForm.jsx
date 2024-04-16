import { AreaField } from '../AreaField/AreaField.jsx'; // Importer le composant AreaField
import { addTweet } from '../../api/models/tweets.js'; // Importer la fonction addTweet depuis les modèles de tweets
import { useAuth } from '../../context/AuthContext/useAuth.js'; // Importer le hook useAuth depuis le contexte AuthContext
import { getTweetsByUserId } from '../../api/models/tweets.js'; // Importer la fonction getTweetsByUserId depuis les modèles de tweets
import { useState } from 'react'; // Importer useState depuis React

export const TweetForm = ({ avatar_url }) => {
  const { user } = useAuth();
  const userId = user ? user.id : null;
  const [tweetContent, setTweetContent] = useState(''); // État pour le contenu du tweet

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const content = formData.get('content');

      // Appel à la fonction addTweet pour ajouter un nouveau tweet
      await addTweet(content);

      // Mise à jour de la liste des tweets
      await updateTweetList();

      // Réinitialisation du formulaire
      form.reset();
    } catch (error) {
      console.error('Error adding tweet:', error);
    }
  };

  const updateTweetList = async () => {
    try {
      // Récupération des tweets de l'utilisateur après l'ajout du nouveau tweet
      const tweetsData = await getTweetsByUserId(userId);
      setTweets(tweetsData);
    } catch (error) {
      console.error('Error updating tweet list:', error);
    }
  };

  return (
    <div className="container mx-auto pb-8">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-semibold flex flex-row justify-start items-center pl-2">Quoi de neuf {user.username} ?</h1>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-2">
          {/* Champ de texte pour le contenu du tweet */}
          <AreaField id={'content'} name={'content'} rows={3} placeholder={'Que voulez-vous partager ?'} onChange={(e) => setTweetContent(e.target.value)} />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              {/* Bouton pour soumettre le tweet */}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Tweet</button>
            </div>
            <div>
              <span className="text-gray-400">Limite de caractères 200</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
