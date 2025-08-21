import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import "./Header.css";
import logo from "../../img/logo.png";
import JarvisIcon from "../JarvisIcon.jsx";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate(); // pour changer de page
  const location = useLocation(); // pour savoir sur quelle route

  const showSearchBar = ["/characters", "/comics"].includes(location.pathname);
  const params = new URLSearchParams(location.search);
  const searchTerm = params.get("search") || "";

  // State pour gérer l’effet hover sur le bouton Jarvis
  const [isHovering, setIsHovering] = useState(false);

  // Clic sur Jarvis : si connecté rien ne change (ou on peut ouvrir modal déconnexion),
  // sinon on navigue vers la page /login
  const handleJarvisClick = () => {
    if (user) {
      // Tu peux garder ta logique de déconnexion/modale d’au revoir ici si tu veux
      // par exemple ouvrir GoodbyeModal
      console.log("Utilisateur déjà connecté");
    } else {
      navigate("/auth"); // navigation vers la page login/signup
    }
  };

  // Met à jour la query "search" dans l’URL pour la recherche
  const handleSearchChange = (value) => {
    const params = new URLSearchParams(location.search);
    params.set("search", value);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <img src={logo} alt="Marvel Logo" className="marvel-logo" />
      </Link>

      <nav className="nav">
        <Link to="/characters">Personnages</Link>
        <Link to="/comics">Comics</Link>
        {user && <Link to="/favorites">Favoris</Link>}

        <button
          className={`login-button ${user ? "logged-in" : "logged-out"}`}
          onClick={handleJarvisClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          aria-label={user ? "Déconnexion" : "Login / Signup"}
        >
          <JarvisIcon isHover={isHovering} isLoggedIn={!user} />
          {user ? `Déconnexion (${user.username})` : "Jarvis"}
        </button>
      </nav>
    </header>
  );
};

export default Header;
