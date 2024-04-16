import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { signOut } from '../../api/models/auth.js';

// Définition du composant SignOutPage
export const SignOutPage = () => {
  // Utilisation du hook useNavigate pour la navigation
  const navigate = useNavigate();

  // Fonction pour gérer la déconnexion
  const handleSignOut = async () => {
    try {
      // Appel de la fonction signOut pour se déconnecter
      await signOut();

      // Rediriger l'utilisateur vers la page de connexion après la déconnexion réussie
      navigate('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  // Affichage de la page de déconnexion
  return (
    <div>
      <p>Vous avez été déconnecté avec succès.</p>
      <p>Vous pouvez vous reconnecter en cliquant sur le bouton ci-dessous.</p>
      <button onClick={handleSignOut}>Se connecter</button>
    </div>
  );
};

export default SignOutPage;
