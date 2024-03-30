import { signUpWithPassword } from '../../api/models/auth.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import InputField from '../../../src/components/ui/Input/InputField.jsx'; // Il semble que cette importation n'est pas utilisée, peut-être la retirer
import { useRef } from 'react';
import SignInPage from './SignInPage.jsx';
import { useAuth } from '../../context/AuthContext/useAuth.js';

const SignUpPage = () => {
  const { userId } = useParams();
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target
    const formData = new FormData(form)
    const email = formData.get('email');
    const password = formData.get('password');
    const username = formData.get('username');
    console.log(email, password, username)
    const result = await signUpWithPassword(username, email, password);
    console.log(result)
    if (result instanceof Error) {
      alert(result.message);
    } else {
      alert('Inscription réussie');
      navigate(`/edit-profile/${session.user.id}`);
    }
  };
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
