import { useState, useEffect } from "react";
import axios from "axios";

const AuthForm = ({ mode, setUser, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUsername("");
    setError("");
    setWelcomeMessage("");
  }, [mode]);

  const handleLogin = async (e) => {
    event.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.user.token);
      setUser(response.data.user);
      setWelcomeMessage(
        `Bienvenue ${response.data.user.username} dans l'univers Marvel`
      );
      if (onSuccess) onSuccess();
    } catch {
      setError("I can do this all day ! - Captain America");
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.user.token);
      setUser(response.data.user);
      setWelcomeMessage(
        `Bienvenue ${response.data.user.username} dans l'univers Marvel`
      );
      if (onSuccess) onSuccess();
    } catch {
      setError("I can do this all day ! - Captain America");
    }
  };

  return (
    <div className="auth-form">
      {mode === "login" && (
        <form onSubmit={handleLogin}>
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
          {error && <p className="auth-error">{error}</p>}
          {welcomeMessage && <p className="auth-welcome">{welcomeMessage}</p>}
        </form>
      )}

      {mode === "signup" && (
        <form onSubmit={handleSignup}>
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
          {error && <p className="auth-error">{error}</p>}
          {welcomeMessage && <p className="auth-welcome">{welcomeMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default AuthForm;
