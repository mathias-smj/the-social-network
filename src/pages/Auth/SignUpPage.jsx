import { signUpWithPassword } from '../../api/models/auth.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import InputField from '../../../src/components/ui/Input/InputField.jsx'; // Importation d'un composant d'entrée de champ
import { useRef } from 'react';
import SignInPage from './SignInPage.jsx'; // Importation de SignInPage, mais il n'est pas utilisé dans ce composant
import { useAuth } from '../../context/AuthContext/useAuth.js';

// Définition du composant SignUpPage
const SignUpPage = () => {
  const { userId } = useParams(); // Obtention des paramètres d'URL
  const { user, session } = useAuth(); // Obtention de l'utilisateur et de la session à partir du contexte d'authentification
  const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire
    const form = event.target; // Récupérer le formulaire
    const formData = new FormData(form); // Créer un objet FormData à partir du formulaire
    const email = formData.get('email'); // Obtenir la valeur de l'email du formulaire
    const password = formData.get('password'); // Obtenir la valeur du mot de passe du formulaire
    const username = formData.get('username'); // Obtenir la valeur du nom d'utilisateur du formulaire

    // Appeler la fonction signUpWithPassword pour l'inscription avec email, mot de passe et nom d'utilisateur
    const result = await signUpWithPassword(username, email, password);

    // Vérifier si le résultat est une instance d'erreur
    if (result instanceof Error) {
      alert(result.message); // Afficher un message d'alerte avec le message d'erreur
    } else {
      alert('Inscription réussie'); // Afficher un message d'alerte pour signaler une inscription réussie
      navigate(`/edit-profile/${session.user.id}`); // Rediriger l'utilisateur vers la page d'édition de profil avec l'ID de l'utilisateur de la session
    }
  };

  // Affichage du formulaire d'inscription
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6">Inscription</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputField id={'username'} type={'text'} label={'Nom utilisateur : '} required={true}/>
          </div>
          <div className="mb-4">
            <InputField id={'email'} type={'email'} label={'Email : '} required={true} />
          </div>
          <div className="mb-4">
            <InputField id={'password'} type={'password'} label={'Mot de passe : '}  required={true} />
          </div>
          <button type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            S'inscrire
          </button>
        </form>
        <p className="text-gray-600 mt-4">Déjà inscrit ? <Link to={'/signIn'} className="text-blue-500 font-semibold"> Se connecter </Link> </p>
      </div>
    </div>
  );
};

export default SignUpPage;
