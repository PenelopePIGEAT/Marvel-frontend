import { useState, useEffect } from "react";
import axios from "axios";

const useFavorites = () => {
  // State pour stocker la liste des favoris
  const [favoritesList, setFavoritesList] = useState([]);

  // Récupération du token pour savoir si l'utilisateur est connecté
  const token = localStorage.getItem("token");

  // Effet pour récupérer les favoris depuis le backend au chargement du hook
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return; // si pas connecté, on ne fait rien

      try {
        const response = await axios.get("http://localhost:3000/favorite", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoritesList(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des favoris :", error);
      }
    };

    fetchFavorites();
  }, [token]);

  // Fonction pour ajouter ou retirer un favori
  const handleFavorite = async (marvelId, data) => {
    if (!token) {
      console.error("Utilisateur non connecté");
      return;
    }

    try {
      // Vérification si le favori existe déjà
      const existing = favoritesList.find(
        (favorite) => favorite.marvelId === marvelId
      );

      if (existing) {
        // Supprimer le favori
        await axios.delete(`http://localhost:3000/favorite/${existing._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoritesList((prev) => prev.filter((f) => f._id !== existing._id));
      } else {
        // Ajouter le favori
        const item = data.results.find((item) => item._id === marvelId);
        const thumbnail = `${item.thumbnail.path}.${item.thumbnail.extension}`;
        const description = item.description || "";

        const response = await axios.post(
          "http://localhost:3000/favorite",
          {
            marvelId,
            type: item.title ? "comic" : "character", // détection du type
            name: item.title || item.name,
            thumbnail,
            description,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFavoritesList((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error("Erreur mise en favoris :", error);
    }
  };

  return { favoritesList, handleFavorite };
};

export default useFavorites;
