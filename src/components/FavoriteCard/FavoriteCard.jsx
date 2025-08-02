import React from "react";
import "./FavoriteCard.css";

const FavoriteCard = ({ name, thumbnail, description }) => {
  return (
    <div className="favoritecard-wrapper">
      <div className="favoritecard-content">
        <div className="favoritecard-front">
          <img src={thumbnail} alt={name} className="favoritecard-image" />
          <h3 className="favoritecard-name">{name}</h3>
        </div>
        <div className="favoritecard-back">
          <p className="favoritecard-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
