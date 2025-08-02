import { FaBolt } from "react-icons/fa";
import "./FavoriteButton.css";

const FavoriteButton = ({ isFavorite, onClick }) => {
  return (
    <button
      className={`favorite-button ${isFavorite ? "active" : ""}`}
      onClick={onClick}
    >
      <FaBolt />
    </button>
  );
};

export default FavoriteButton;
