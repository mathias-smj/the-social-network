import { Link, useNavigate, useParams } from 'react-router-dom';
import InputField from '../../../src/components/ui/Input/InputField.jsx';
import { signInWithPassword } from '../../api/models/auth.js';
import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext.jsx';
import { useAuth } from '../../context/AuthContext/useAuth.js';
import { toast } from 'sonner';

// Définition du composant SignInPage
const SignInPage = () => {
  // Utilisation du hook useNavigate pour la navigation
  const navigate = useNavigate();

  // Utilisation du hook useParams pour récupérer les paramètres d'URL
  const { username } = useParams();

  // Utilisation du hook useAuth pour accéder au contexte d'authentification
  const { user, session } = useAuth();

  // Fonction de soumission du formulaire de connexion
  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    // Appel de la fonction signInWithPassword pour se connecter avec l'email et le mot de passe
    const result = signInWithPassword(email, password);

    // Si la connexion échoue, gérer l'erreur (non implémenté dans le code actuel)
    if (result instanceof Error) {
      // Gérer l'erreur ici
    } else {
      // Rediriger l'utilisateur vers la page d'accueil après la connexion réussie
      navigate(`/`);
    }
  };

  // Affichage du formulaire de connexion
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2">
        <img src={'src/utils/images.png'} alt="Logo X" />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputField id={'email'} label={'E-Mail : '} type={'email'} required={true} />
          </div>
          <InputField id={'password'} label={'mot de passe : '} type={'password'} required={true} />
          <button
            className="px-4 py-2 mx-auto mt-6 text-l font-bold bg-blue-500 w-64 rounded-full flexMid hover:bg-blue-600"
          >
            <div>
              <p className="text-white">Se connecter</p>
            </div>
          </button>
        </form>
        <p className="text-gray-600 mt-4">Nouveau sur notre site? <Link to={'/'} className="text-blue-500 font-semibold">S'inscrire</Link></p>
      </div>
    </div>
  );
}

export default SignInPage;
