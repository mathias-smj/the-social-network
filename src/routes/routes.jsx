import NotFound from '../pages/NotFound/NotFound.jsx';
import SignInPage from '../pages/Auth/SignInPage.jsx';
import App from '../App.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import EditProfilPage from '../pages/User/EditProfilPage.jsx';
import ProfilePage from '../pages/User/ProfilePage.jsx';
import HomePage from '../pages/Home/HomePage.jsx';
import SignOutPage from '../pages/Auth/SignOutPage.jsx';
import FollowersList from '../components/FollowersList/FollowersList.jsx';
import SignUpPage from '../pages/Auth/SignUpPage.jsx';
/*
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
 */
export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: (
        <HomePage />
        ),
      },
      {
        path: '/signIn',
        element: <SignInPage />,
      },
      {
        path: '/signUp',
        element: <SignUpPage />,
      },
      {
        path: '/signOut',
        element: <SignOutPage />,
      },
      {
        path: '/followers-list',
        element: <FollowersList />,
      },
      {
        path: '/profil/:userId',
        element: <ProfilePage />,
      },
      {
        path: '/edit-profil',
        element: (
          <ProtectedRoute>
            <EditProfilPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
