import { Link } from 'react-router-dom';

// Composant de bas de page
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black rounded-lg shadow-xs">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Mon Super Footer</h3>
          <p className="text-sm">© 2024 Mon Clone Twitter. Tous droits réservés.</p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li><Link to={'/'} className="hover:text-gray-300">Accueil</Link></li>
            <li><Link to={'/edit-profil'} className="hover:text-gray-300">Profil</Link></li>
            <li><Link to={'#'} className="hover:text-gray-300">Messages</Link></li>
            <li><Link to={'#'} className="hover:text-gray-300">Paramètres</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
