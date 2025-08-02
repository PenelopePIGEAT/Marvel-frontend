import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Home from "./pages/PageHome/Home";
import Header from "./components/HeaderComponent/Header";
import Modal from "./components/ModalComponent/Modal";
import Footer from "./components/FooterComponent/Footer";
import Characters from "./pages/PageCharacters/Characters";
import CharacterInComics from "./pages/PageCharacterInComics/CharacterInComics";
import Comics from "./pages/PageComics/Comics";
import CharacterDetail from "./pages/PageCharacterDetails/Characterdetails";
import ComicDetail from "./pages/PageComicDetails/ComicDetails";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hoverIcon, setHoverIcon] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Header
          onLoginClick={() => setModalOpen(true)}
          onIconHover={setHoverIcon}
          isHovering={hoverIcon}
        />
        <Modal show={modalOpen} onClose={() => setModalOpen(false)} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route
              path="/comics/:characterId"
              element={<CharacterInComics />}
            />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/comics" element={<Comics />} />
            <Route path="/comic/:id" element={<ComicDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
