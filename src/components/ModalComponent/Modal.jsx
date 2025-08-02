import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "./Modal.css";
import ironmanImg from "../../img/ironman.png";

const Modal = ({ show, onClose, setUser }) => {
  // sate pour gérer quel onglet est actif : login ou signup
  const [tab, setTab] = useState("login");
  // state pour stocker les valeurs des champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  // pour afficher un message d'erreur si besoin
  const [error, setError] = useState("");
  // message de bienvenue après log
  const [welcomeMessage, setWelcomeMessage] = useState("");

  // écoute l'appui sur la touche Echap pour fermer la modale
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    if (show) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [show, onClose]);

  // reset des champs et erreurs à chaque changement d'onglet
  useEffect(() => {
    setEmail("");
    setPassword("");
    setUsername("");
    setError("");
  }, [tab]);

  // gestion du log utilisateur
  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    try {
      // envoie des données au serveur
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      // log de debug et de galères
      console.log("Login response date:", response.data);
      console.log("Login success:", response.data);
      // sauvegarde du token au localstorage
      localStorage.setItem("token", response.data.user.token);
      console.log("Token saved in LocalStorage:", response.data.user.token);

      //Welcome message
      setWelcomeMessage(
        `Bienvenue ${response.data.user.username} dans l'univers Marvel`
      );
      //met à jour le user
      setUser(response.data.user);
      //fermeture auto ! 2sec = 2000
      setTimeout(() => {
        setWelcomeMessage("");
        onClose();
      }, 2000);
    } catch (error) {
      setError("I can do this all day ! - Captain America");
    }
  };

  // gestion du signup utilisateur
  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password,
      });

      console.log("Signup success:", response.data);
      // stokage en localstorage
      localStorage.setItem("token", response.data.user.token);
      //welcome message again
      setWelcomeMessage(
        `Bienvenue ${response.data.user.username} dans l'univers Marvel`
      );
      //mise à jour user
      setUser(response.data.user);
      //fermeture
      setTimeout(() => {
        setWelcomeMessage("");
        onClose();
      }, 2000);
    } catch (error) {
      console.log(error.response?.data || error.message);
      setError("I can do this all day ! - Captain America");
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={ironmanImg} alt="Iron Man" className="modal-hero" />

            <div className="modal-tabs">
              <button
                className={tab === "login" ? "active" : ""}
                onClick={() => setTab("login")}
              >
                Login
              </button>
              <button
                className={tab === "signup" ? "active" : ""}
                onClick={() => setTab("signup")}
              >
                Signup
              </button>
            </div>

            {tab === "login" && (
              <form className="modal-form" onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button type="submit">Se connecter</button>
                {error && <p className="modal-error">{error}</p>}
                {welcomeMessage && (
                  <p className="modal-welcome">{welcomeMessage}</p>
                )}
              </form>
            )}

            {tab === "signup" && (
              <form className="modal-form" onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button type="submit">S'inscrire</button>
                {error && <p className="modal-error">{error}</p>}
                {welcomeMessage && (
                  <p className="modal-welcome">{welcomeMessage}</p>
                )}
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
