import React, { useEffect, useState } from "react";
import useFavorites from "../hooks/useFavorites";
import CharacterCard from "../CardComponent/CharacterCard";
import ComicCard from "../CardComponent/ComicCard";
import "./Favourites.css";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Favorites = () => {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const {
    favorites: initialFavorites,
    loadingFavorites,
    errorFavorites,
  } = useFavorites();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(initialFavorites);
  }, [initialFavorites]);

  const handleFavorite = async (favoriteId) => {
    try {
      await axios.delete(`http://localhost:3000/favorites/${favoriteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFavorites((prev) => prev.filter((fav) => fav._id !== favoriteId));
    } catch (error) {
      console.error("Erreur lors de la suppression du favori :", error);
    }
  };

  if (loadingFavorites) return <p>Chargement des favoris...</p>;
  if (errorFavorites) return <p>Erreur lors du chargement des favoris.</p>;
  if (favorites.length === 0)
    return <p>Tu n’as aucun favori pour le moment.</p>;

  return (
    <main className="favourites-container">
      <h1>Mes Favoris</h1>
      <section className="favourites-list">
        {favorites.map((fav) => {
          if (fav.type === "character") {
            return (
              <CharacterCard
                key={fav._id}
                id={fav.marvelId}
                name={fav.name}
                description={fav.description || "Description non disponible"}
                thumbnail={fav.thumbnail}
                isFavorite={true}
                handleFavorite={() => handleFavorite(fav._id)}
              />
            );
          }
          if (fav.type === "comic") {
            return (
              <ComicCard
                key={fav._id}
                id={fav.marvelId}
                title={fav.name}
                description={fav.description || "Description non disponible"}
                thumbnail={fav.thumbnail}
                isFavorite={true}
                handleFavorite={() => handleFavorite(fav._id)}
              />
            );
          }
          return null;
        })}
      </section>
    </main>
  );
};

export default Favorites;
