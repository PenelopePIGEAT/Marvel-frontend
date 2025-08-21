import { motion, AnimatePresence } from "framer-motion";
import ironmanImg from "../../img/ironman.png";
import AuthForm from "../AuthForm";

//Composant ModalAuth : gère l'affichage de la fenêtre modale pour login/signup//
const ModalAuth = ({ show, onClose, setUser }) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay qui assombrit l'arrière-plan et ferme la modale au clic */}
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Contenu principal de la modale */}
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(event) => event.stopPropagation()} // Empêche la fermeture quand on clique dans la modale
          >
            {/* Illustration héro Marvel */}
            <img src={ironmanImg} alt="Iron Man" className="modal-hero" />

            {/* Formulaire d'authentification réutilisable */}
            <AuthForm setUser={setUser} onSuccess={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalAuth;
