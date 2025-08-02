import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CharacterCard from "../../components/CardComponent/CharacterCard";
import "./Characters.css";
import SearchBarCharacter from "../../components/SearchBarComponent/SearchBarCharacter.jsx";

const Characters = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const page = parseInt(params.get("page") || "1", 10);
  const initialSearch = params.get("search") || "";

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [inputValue, setInputValue] = useState(initialSearch);

  // verification login avant //
  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      console.log("Token récupéré avant requête favorites :", token);

      if (!token) {
        console.error("Utilisateur non connecté : PAS DE TOKEN !!!");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/favorite", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFavorites(response.data);

        console.log("Favoris reçus depuis le back:", response.data);
      } catch (error) {
        console.error("Erreur chargement favoris :", error);
      }
    };

    fetchFavorites();
  }, []);

  // Barre de recherche de la muerte que j'ai abandonner //
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchTerm(inputValue);
      const newParams = new URLSearchParams(location.search);
      newParams.set("search", inputValue);
      newParams.set("page", "1");
      navigate(`${location.pathname}?${newParams.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  // Affichage des cards characters //
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3000/characters?page=${page}&search=${searchTerm}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Erreur chargement des characters depuis le back :",
          error
        );
      }
    };

    fetchData();
  }, [page, searchTerm]);

  // Gestion des favoris //

  const handleFavorite = async (marvelId) => {
    try {
      const token = localStorage.getItem("token");

      const existing = favorites.find(
        (favorite) =>
          favorite.marvelId === marvelId && favorite.type === "character"
      );

      if (existing) {
        // Supprimer
        await axios.delete(`http://localhost:3000/favorite/${existing._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFavorites((prev) => prev.filter((f) => f._id !== existing._id)); // prev ? f ?
      } else {
        // Ajouter
        const character = data.results.find(
          (character) => character._id === marvelId
        );
        const thumbnail = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        const description = character.description || "";

        const response = await axios.post(
          "http://localhost:3000/favorite",
          {
            marvelId,
            type: "character",
            name: character.name,
            thumbnail,
            description,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFavorites((prev) => [...prev, response.data]); // ajout du favoris dans le state //
      }
    } catch (error) {
      console.error("Erreur mise en favoris :", error);
    }
  };

  // pagination //

  const changePage = (newPage) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("page", newPage);
    newParams.set("search", searchTerm);
    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  // ce que retourn la page //

  return isLoading ? (
    <p>Jarvis in action, Sir !</p>
  ) : (
    <main>
      <h1>Personnages de l'univers Marvel</h1>

      <SearchBarCharacter
        className="searchbar"
        searchTerm={inputValue}
        onSearchChange={setInputValue}
      />

      <section className="articles-container">
        {data.results.map((character) => (
          <CharacterCard
            key={character._id}
            id={character._id}
            name={character.name}
            description={character.description}
            thumbnail={character.thumbnail}
            isFavorite={favorites.some(
              (fav) =>
                fav.marvelId === character._id && fav.type === "character"
            )}
            handleFavorite={handleFavorite}
          />
        ))}
      </section>

      <div className="pagination">
        <button onClick={() => changePage(page - 1)} disabled={page === 1}>
          ←
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => changePage(page + 1)}
          disabled={data.results.length < 100}
        >
          →
        </button>
      </div>
    </main>
  );
};

export default Characters;
