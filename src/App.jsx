import { Outlet, useLocation } from 'react-router-dom';
import { PageLayout } from './pages/shared/PageLayout.jsx';
import Footer from './components/Footer/Footer.jsx';
import React from 'react';
import { useAuth } from './context/AuthContext/useAuth.js';
import { AuthProvider } from './context/AuthContext/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

function Main() {
  return (
    <>
      <Content />
      <Footer />
    </>
  );
}

function Content() {
  const location = useLocation();
  const { user } = useAuth();
  const shouldShowPageLayout = user && (location.pathname === '/' || location.pathname === '/followers-list' || location.pathname === '/edit-profil' || location.pathname === '/profil/:userId');
  return (
    <>
      {shouldShowPageLayout ? (
        <PageLayout>
          <Outlet />
        </PageLayout>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default App;
