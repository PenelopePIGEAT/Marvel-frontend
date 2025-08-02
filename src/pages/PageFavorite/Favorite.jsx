import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FavoriteCard from "../../components/FavoriteCard/FavoriteCard";

function Favorites() {
  // 1. Créer un state pour garder les favoris
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // 2. Faire la requête pour récupérer les favoris dès que la page charge
  useEffect(() => {
    // Fonction pour charger les favoris
    function fetchFavorites() {
      // Récupérer le token dans le localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        // Si pas de token, on return sur la page Home
        navigate("/");
        return;
      }

      // Requête axios pour récupérer les favoris
      axios
        .get("http://localhost:3000/favorite", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          // Mettre les favoris dans le state
          setFavorites(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des favoris :", error);
        });
    }

    fetchFavorites();
  }, [navigate]); // [] = on fait ça une fois au chargement

  // 3. Afficher la liste des favoris
  return (
    <main>
      <h1>Mes Favoris</h1>
      {favorites.length === 0 ? (
        <p>Tu n'as pas encore de favoris 💔</p>
      ) : (
        <div className="favorite-container">
          {favorites.map((fav) => {
            console.log(JSON.stringify(fav, null, 2)); // Log la description ici
            return (
              <FavoriteCard
                key={fav._id}
                name={fav.name}
                thumbnail={fav.thumbnail}
                description={fav.description}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Favorites;
