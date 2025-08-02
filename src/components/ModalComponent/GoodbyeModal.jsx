import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bouclierImg from "../../img/bouclier.png";

const GoodbyeModal = ({ show, onClose, username }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

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
            role="dialog"
            aria-modal="true"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
            style={{ textAlign: "center", padding: "1rem" }}
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
