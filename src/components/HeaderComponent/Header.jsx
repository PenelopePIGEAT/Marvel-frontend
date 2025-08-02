import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import "./Header.css";
import logo from "../../img/logo.png";
import JarvisIcon from "../JarvisIcon.jsx";
import Modal from "../ModalComponent/Modal.jsx";
import GoodbyeModal from "../ModalComponent/GoodbyeModal.jsx";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showSearchBar = ["/characters", "/comics"].includes(location.pathname);

  const params = new URLSearchParams(location.search);
  const searchTerm = params.get("search") || "";

  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [goodbyeOpen, setGoodbyeOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleJarvisClick = () => {
    if (user) {
      setGoodbyeOpen(true);
    } else {
      setModalOpen(true);
    }
  };

  const handleGoodbyeClose = () => {
    setGoodbyeOpen(false);
    setUser(null);
  };

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
        {user && <Link to="/favourites">Favoris</Link>}

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
