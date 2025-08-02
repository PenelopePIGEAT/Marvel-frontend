import "../CardComponent/Card.css";
import FavoriteButton from "../FavoriteButtonComponent/FavoriteButton";
import { useNavigate } from "react-router-dom";

const ComicCard = ({
  id,
  title,
  description,
  thumbnail,
  isFavorite,
  handleFavorite,
}) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/comic/${id}`);
  };

  return (
    <article className="card-div">
      {thumbnail && (
        <img
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt={title}
          className="card-img"
        />
      )}
      <p className="card-name">{title}</p>
      <p className="card-description">{description ? description : ""}</p>
      <button className="comics-button" onClick={goToDetail}>
        En savoir plus
      </button>
      <FavoriteButton
        isFavorite={isFavorite}
        onClick={() => handleFavorite(id)}
      />
    </article>
  );
};

export default ComicCard;
