import { GoHeart } from "react-icons/go";
import { LuHome } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { SlLogin, SlLogout } from "react-icons/sl";
import { FaFeather } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signOut } from '../../../api/models/auth.js';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    signOut();
  };

  return (
    <nav className="flex flex-col items-center justify-between h-screen max-h-[500px] gap-y-8 bg-gray-100 p-4">
      <NavLink to="/" icon={<LuHome />} text={"Accueil"} />

      {/* Liens de navigation */}
      <>
        <NavLink to="/favoris" icon={<GoHeart />} text={"Favoris"} />
        <NavLink to="/profil" icon={<FaRegUser />} text={"Profil"} />
        <button className="nav-button" onClick={handleLogout}>
          <div className="nav-icon">
            <SlLogout className="rotate-180" />
          </div>
          <span className="nav-text">Déconnexion</span>
        </button>
        <button className="nav-button">
          <span className="nav-text">Ecrire</span>
          <div className="nav-icon">
            <FaFeather />
          </div>
        </button>
      </>

      {/* Bouton de connexion */}
      <button className="nav-button">
        <div className="nav-icon">
          <SlLogin />
        </div>
        <span className="nav-text">Connexion</span>
      </button>
    </nav>
  );
}

function NavLink({ to, icon, text }) {
  return (
    <button className="nav-button">
      {icon && <div className="nav-icon">{icon}</div>}
      <span className="nav-text">{text}</span>
    </button>
  );
}
