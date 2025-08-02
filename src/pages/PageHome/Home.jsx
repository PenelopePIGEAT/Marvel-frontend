import React, { useState } from "react";

import Modal from "../../components/ModalComponent/Modal.jsx";

import "./Home.css";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [hoverIcon, setHoverIcon] = useState(false);

  return (
    <div className="home-container">
      <main className="main-content"></main>

      <Modal show={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Home;
