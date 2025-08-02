const JarvisIcon = ({ isHover, isLoggedIn }) => {
  // Définition couleur selon log
  const mainColor = isLoggedIn ? "#e62429" : "#00f6ff";
  const hoverColor = isLoggedIn ? "#e62429" : "#00f6ff";

  return (
    <svg
      width="40" // largeur fixe de l'icône
      height="40" // hauteur fixe de l'icône
      viewBox="0 0 64 64" // coordonnées internes du SVG
      xmlns="http://www.w3.org/2000/svg" // namespace SVG
      style={{
        // effet zoom léger au survol
        transform: isHover ? "scale(1.08)" : "scale(1)",
        transition: "transform 0.3s ease", // transition fluide du zoom
      }}
    >
      {/* Cercle extérieur qui délimite l'icône */}
      <circle
        cx="32" // centre horizontal
        cy="32" // centre vertical
        r="28" // rayon large pour le cercle extérieur
        stroke={mainColor} // couleur du contour (rouge ou bleu selon connexion)
        strokeWidth="2" // épaisseur du contour
        fill="none" // pas de remplissage à l'intérieur
      />
      {/* Cercle intermédiaire avec remplissage au survol */}
      <circle
        cx="32" // même centre
        cy="32"
        r="12" // rayon plus petit que le grand cercle
        stroke={hoverColor} // contour couleur survol
        strokeWidth="1.5" // contour un peu plus fin
        fill={isHover ? hoverColor : "transparent"} // remplissage visible au survol
      />
      {/* Petit cercle central plein */}
      <circle cx="32" cy="32" r="4" fill={mainColor} />
    </svg>
  );
};

export default JarvisIcon;
