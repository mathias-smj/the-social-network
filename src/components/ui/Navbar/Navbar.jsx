import { GoHeart } from "react-icons/go"; // Importe l'icône de cœur depuis react-icons/go
import { LuHome } from "react-icons/lu"; // Importe l'icône de maison depuis react-icons/lu
import { FaRegUser } from "react-icons/fa6"; // Importe l'icône d'utilisateur régulier depuis react-icons/fa6
import { SlLogin, SlLogout } from "react-icons/sl"; // Importe les icônes de connexion et de déconnexion depuis react-icons/sl
import { FaFeather } from "react-icons/fa"; // Importe l'icône de plume depuis react-icons/fa
import { useNavigate } from "react-router-dom"; // Importe le hook useNavigate depuis react-router-dom
import { signOut } from '../../../api/models/auth.js'; // Importe la fonction de déconnexion depuis le modèle d'authentification

export default function Navbar() { // Définit le composant Navbar
  const navigate = useNavigate(); // Initialise le hook useNavigate pour la navigation

  // Fonction handleLogout pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    navigate("/"); // Redirige l'utilisateur vers la page d'accueil
    signOut(); // Appelle la fonction signOut pour déconnecter l'utilisateur
  };

  return (
    <nav className="flex flex-col items-center justify-between h-screen max-h-[500px] gap-y-8 bg-gray-100 p-4">
      {/* Lien de navigation vers la page d'accueil */}
      <NavLink to="/" icon={<LuHome />} text={"Accueil"} />

      {/* Liens de navigation vers d'autres pages */}
      <>
        <NavLink to="/favoris" icon={<GoHeart />} text={"Favoris"} /> {/* Lien vers la page des favoris */}
        <NavLink to="/profil" icon={<FaRegUser />} text={"Profil"} /> {/* Lien vers la page de profil */}
        <button className="nav-button" onClick={handleLogout}> {/* Bouton de déconnexion */}
          <div className="nav-icon">
            <SlLogout className="rotate-180" /> {/* Icône de déconnexion */}
          </div>
          <span className="nav-text">Déconnexion</span> {/* Texte du bouton */}
        </button>
        <button className="nav-button"> {/* Bouton d'écriture */}
          <span className="nav-text">Ecrire</span> {/* Texte du bouton */}
          <div className="nav-icon">
            <FaFeather /> {/* Icône de plume */}
          </div>
        </button>
      </>

      {/* Bouton de connexion */}
      <button className="nav-button">
        <div className="nav-icon">
          <SlLogin /> {/* Icône de connexion */}
        </div>
        <span className="nav-text">Connexion</span> {/* Texte du bouton */}
      </button>
    </nav>
  );
}

// Composant NavLink pour représenter chaque lien de navigation
function NavLink({ to, icon, text }) {
  return (
    <button className="nav-button">
      {icon && <div className="nav-icon">{icon}</div>} {/* Affiche l'icône si elle est fournie */}
      <span className="nav-text">{text}</span> {/* Texte du lien de navigation */}
    </button>
  );
}
