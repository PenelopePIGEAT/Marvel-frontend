import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Pour les animations d'apparition/disparition
import bouclierImg from "../../img/bouclier.png";

const GoodbyeModal = ({ show, onClose, username }) => {
  // Quand le modal s'ouvre, on lance un timer pour le fermer automatiquement au bout de 3 secondes
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer); // Nettoyage du timer si le composant se démonte ou show change
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {/* AnimatePresence anime l'entrée et la sortie conditionnelle du modal */}
      {show && (
        <>
          {/* Fond semi-transparent derrière le modal */}
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }} // départ invisible
            animate={{ opacity: 0.8 }} // opacité à 0.8 quand visible
            exit={{ opacity: 0 }} // retour invisible à la sortie
            onClick={onClose} // clic sur fond ferme le modal
          />
          {/* Contenu du modal avec animation zoom  */}
          <motion.div
            className="modal-content"
            role="dialog" // boîte de dialogue
            aria-modal="true" // focus bloqué sur le modal
            initial={{ scale: 0.8, opacity: 0 }} // départ zoom réduit + invisible
            animate={{ scale: 1, opacity: 1 }} // zoom à taille normale + visible
            exit={{ scale: 0.8, opacity: 0 }} // zoom réduit + invisible à la sortie
            onClick={(event) => event.stopPropagation()} // empêche la fermeture en cliquant dedans
            style={{ textAlign: "center", padding: "16px" }} // styleinline
          >
            <img src={bouclierImg} alt="bouclier" className="modal-hero" />

            <p>
              Au revoir <strong>{username}</strong>, à bientôt dans l'univers
              Marvel !
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GoodbyeModal;
