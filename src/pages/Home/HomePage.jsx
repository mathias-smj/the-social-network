import { useAuth } from '../../context/AuthContext/useAuth.js';
import DefaultContent from './DefaultContent.jsx';
import AuthenticatedContent from './AuthenticatedContent.jsx';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <DefaultContent />;

  } else {
    return <AuthenticatedContent />;
  }
};
export default HomePage;
