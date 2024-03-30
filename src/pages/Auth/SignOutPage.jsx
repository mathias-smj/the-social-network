import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { signOut } from '../../api/models/auth.js';

export const SignOutPage = () => {
  const navigate = useNavigate();
    const handleSignOut = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        await signOut();
        navigate('/signin');
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div>
      <p>Vous avez été déconnecté avec succès.</p>
      <p>Vous pouvez vous reconnecter en cliquant sur le bouton ci-dessous.</p>
      <button onClick={handleSignOut}>Se connecter</button>
    </div>
  );
};

export default SignOutPage;