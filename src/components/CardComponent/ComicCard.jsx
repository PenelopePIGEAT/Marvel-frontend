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
  isLoggedIn,
  openAskToLog,
}) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/comic/${id}`);
  };

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    console.log("Favorite clicked. Logged in?", isLoggedIn);

    if (!isLoggedIn) {
      console.log("User not logged in, opening modal");
      openAskToLog();
      return;
    }

    handleFavorite(id);
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
      <FavoriteButton isFavorite={isFavorite} onClick={handleFavoriteClick} />
    </article>
  );
};

export default ComicCard;
