import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import "./Header.css";
import logo from "../../img/logo.png";
import JarvisIcon from "../JarvisIcon.jsx";
import Modal from "../ModalComponent/Modal.jsx";
import GoodbyeModal from "../ModalComponent/GoodbyeModal.jsx";

const Header = () => {
  const navigate = useNavigate(); //pour changer de page
  const location = useLocation(); //pour savoir sur quelle route

  // Affiche la barre de recherche seulement sur /characters et /comics mais à revenir dessus puisque finalement je fais une search par page
  const showSearchBar = ["/characters", "/comics"].includes(location.pathname);
  // Récupère la valeur "search" dans l'url
  const params = new URLSearchParams(location.search);
  const searchTerm = params.get("search") || "";

  // State pour stocker l'utilisateur connecté (null si pas connecté)
  const [user, setUser] = useState(null);
  // State pour ouvrir/fermer la modale de login/signup
  const [modalOpen, setModalOpen] = useState(false);
  // State pour ouvrir/fermer la modale d’au revoir (déconnexion)
  const [goodbyeOpen, setGoodbyeOpen] = useState(false);
  // State pour gérer l’effet hover sur le bouton Jarvis
  const [isHovering, setIsHovering] = useState(false);

  //Clic sur  jarvis si connecté, ouvre modale déconnexion, sinon modale login/signup
  const handleJarvisClick = () => {
    if (user) {
      setGoodbyeOpen(true);
    } else {
      setModalOpen(true);
    }
  };

  // Ferme la modale d’au revoir et déconnecte l’utilisateur
  const handleGoodbyeClose = () => {
    setGoodbyeOpen(false);
    setUser(null);
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

      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        setUser={setUser}
      />
      <GoodbyeModal
        show={goodbyeOpen}
        onClose={handleGoodbyeClose}
        username={user?.username}
      />
    </header>
  );
};

export default Header;
