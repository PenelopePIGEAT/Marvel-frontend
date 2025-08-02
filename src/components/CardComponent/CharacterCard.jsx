import "../CardComponent/Card.css";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../FavoriteButtonComponent/FavoriteButton.jsx";

const CharacterCard = ({
  id,
  name,
  description,
  thumbnail,
  isFavorite,
  handleFavorite,
}) => {
  // Initialisation du navigate pour changer de route
  const navigate = useNavigate();

  // Fonction pour aller à la page détail du personnage au clic
  const goToDetail = () => {
    navigate(`/character/${id}`);
  };

  // Fonction pour aller à la page comics, en stoppant la propagation
  const goToComics = (event) => {
    event.stopPropagation();
    navigate(`/comics/${id}`);
  };

  // Gestion du clic sur le bouton favoris : stoppe propagation
  // puis lance la fonction passée en props pour toggle favori

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    handleFavorite(id);
  };

  return (
    <article className="card-div">
      {thumbnail && (
        <img
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt={name}
          className="card-img clickable"
          onClick={goToDetail}
        />
      )}

      <p className="card-name clickable" onClick={goToDetail}>
        {name}
      </p>

      <p className="card-description clickable" onClick={goToDetail}>
        {description ? description : ""}
      </p>

      <button className="comics-button" onClick={goToComics}>
        Comicsgraphie
      </button>

      <div onClick={handleFavoriteClick}>
        <FavoriteButton isFavorite={isFavorite} />
      </div>
    </article>
  );
};

export default CharacterCard;
