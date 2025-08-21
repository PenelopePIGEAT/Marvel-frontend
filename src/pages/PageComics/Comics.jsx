import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ComicCard from "../../components/CardComponent/ComicCard.jsx";
import SearchBarComic from "../../components/SearchBarComponent/SearchBarCharacter.jsx";
import useFavorites from "../../hook/useFavorites.jsx";
import useComics from "../../hook/useComics.jsx";
import "./Comics.css";

const Comics = () => {
  // Récupération des informations de l'URL pour pagination et recherche
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const page = parseInt(params.get("page") || "1", 10);
  const initialSearch = params.get("search") || "";

  // State pour la valeur de l'input de recherche
  const [inputValue, setInputValue] = useState(initialSearch);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Hook pour récupérer les comics depuis l'API
  const { data, isLoading } = useComics(page, searchTerm);

  // Hook pour gérer les favoris (fetch + ajout/suppression)
  const { favoritesList, handleFavorite } = useFavorites();

  // State pour gérer la modal "invite à se connecter"
  const [isAskToLog, setIsAskToLog] = useState(false);
  const openAskToLog = () => setIsAskToLog(true);
  const closeAskToLog = () => setIsAskToLog(false);

  // Vérification si l'utilisateur est connecté
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // Effet pour gérer le debounce de la barre de recherche
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchTerm(inputValue);

      // Mise à jour des paramètres de l'URL
      const newParams = new URLSearchParams(location.search);
      newParams.set("search", inputValue);
      newParams.set("page", "1");
      navigate(`${location.pathname}?${newParams.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  // Fonction pour gérer le changement de page
  const changePage = (newPage) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("page", newPage);
    newParams.set("search", searchTerm);
    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  // Affichage du loader pendant que les données sont en cours de récupération
  if (isLoading) return <p>Chargement des comics en cours...</p>;

  // Rendu principal
  return (
    <main>
      <h1>Comics Marvel</h1>

      {/* Barre de recherche */}
      <SearchBarComic searchTerm={inputValue} onSearchChange={setInputValue} />

      {/* Liste des comics */}
      <section className="articles-container">
        {data.results.map((comic) => (
          <ComicCard
            key={comic._id}
            id={comic._id}
            title={comic.title}
            description={comic.description}
            thumbnail={comic.thumbnail}
            isFavorite={favoritesList.some(
              (favorite) =>
                favorite.marvelId === comic._id && favorite.type === "comic"
            )}
            handleFavorite={() => handleFavorite(comic._id, data)}
            isLoggedIn={isLoggedIn}
            openAskToLog={openAskToLog}
          />
        ))}
      </section>

      {/* Pagination */}
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

// Export du composant
export default Comics;
