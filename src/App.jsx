import { Outlet, useLocation } from 'react-router-dom';
import { PageLayout } from './pages/shared/PageLayout.jsx'; // Importation du composant de mise en page
import Footer from './components/Footer/Footer.jsx'; // Importation du composant de pied de page
import React from 'react';
import { useAuth } from './context/AuthContext/useAuth.js'; // Importation du hook personnalisé useAuth
import { AuthProvider } from './context/AuthContext/AuthContext.jsx'; // Importation du fournisseur de contexte d'authentification

function App() {
  return (
    // Utilisation du AuthProvider pour envelopper l'ensemble de l'application et fournir le contexte d'authentification
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

// Composant principal
function Main() {
  return (
    <>
      <Content />
      <Footer />
    </>
  );
}

// Composant Content pour afficher le contenu principal
function Content() {
  const location = useLocation(); // Utilisation du hook useLocation pour obtenir l'emplacement actuel
  const { user } = useAuth(); // Utilisation du hook useAuth pour obtenir l'état d'authentification de l'utilisateur

  // Détermination si la mise en page de la page est nécessaire en fonction de l'utilisateur et de l'emplacement actuel
  const shouldShowPageLayout = user && (location.pathname === '/' || location.pathname === '/followers-list' || location.pathname === '/edit-profil' || location.pathname === '/profil/:userId');

  return (
    <>
      {/* Affichage du contenu avec ou sans mise en page en fonction de shouldShowPageLayout */}
      {shouldShowPageLayout ? (
        // Si la mise en page est nécessaire, afficher le PageLayout avec Outlet pour le contenu spécifique à la page
        <PageLayout>
          <Outlet />
        </PageLayout>
      ) : (
        // Sinon, afficher simplement Outlet pour afficher le contenu spécifique à la page
        <Outlet />
      )}
    </>
  );
}

export default App;
