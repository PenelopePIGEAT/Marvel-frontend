import React, { useState } from "react";

//import Modal from "../../components/ModalComponent/Modal.jsx";

import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <main className="main-content"></main>

      <Modal show={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Home;
