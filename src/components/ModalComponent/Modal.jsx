import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "./Modal.css";
import ironmanImg from "../../img/ironman.png";

const Modal = ({ show, onClose, setUser }) => {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    if (show) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [show, onClose]);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUsername("");
    setError("");
  }, [tab]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      console.log("Login success:", res.data);
      setWelcomeMessage(
        `Bienvenue ${res.data.user.username} dans l'univers Marvel`
      );
      setUser(res.data.user);
      setTimeout(() => {
        setWelcomeMessage("");
        onClose();
      }, 2000);
    } catch (error) {
      setError("I can do this all day ! - Captain America");
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password,
      });
      console.log("Signup success:", res.data);
      setWelcomeMessage(
        `Bienvenue ${res.data.user.username} dans l'univers Marvel`
      );
      setUser(res.data.user);
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
