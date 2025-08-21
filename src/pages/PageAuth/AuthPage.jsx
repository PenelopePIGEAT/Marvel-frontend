import React, { useState } from "react";
import ironmanImg from "../../img/ironman.png";
import AuthForm from "../../components/AuthForm.jsx";
import "./AuthPage.css";

const AuthPage = ({ setUser }) => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-page">
      <img src={ironmanImg} alt="Iron Man" className="auth-hero" />

      <div className="auth-container">
        <h1 className="auth-title">Rejoins l'univers Marvel</h1>

        <div className="auth-tabs">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>

          <button
            className={activeTab === "signup" ? "active" : ""}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>

        <AuthForm setUser={setUser} mode={activeTab} />
      </div>
    </div>
  );
};

export default AuthPage;
