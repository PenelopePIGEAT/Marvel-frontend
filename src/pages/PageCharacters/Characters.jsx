import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBarCharacter from "../../components/SearchBarComponent/SearchBarCharacter.jsx";
import CharacterCard from "../../components/CardComponent/CharacterCard.jsx";
import useFavorites from "../../hook/useFavorites.jsx";
import useCharacters from "../../hook/useCharacters.jsx";
import "./Characters.css";

const Characters = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialPage = parseInt(params.get("page") || "1", 10);
  const initialSearch = params.get("search") || "";

  const [inputValue, setInputValue] = useState(initialSearch);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);

  const { data, isLoading } = useCharacters(page, searchTerm);
  const { favoritesList, handleFavorite } = useFavorites();

  const handleSearchSubmit = (value) => {
    setSearchTerm(value);
    setPage(1);
    const newParams = new URLSearchParams();
    newParams.set("search", value);
    newParams.set("page", "1");
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
  };

  const changePage = (newPage) => {
    setPage(newPage);
    const newParams = new URLSearchParams();
    newParams.set("search", searchTerm);
    newParams.set("page", newPage);
    navigate(`${location.pathname}?${newParams.toString()}`, { replace: true });
  };

  if (isLoading) return <p>Chargement des personnages en cours...</p>;

  return (
    <main>
      <h1>Personnages de l'univers Marvel</h1>

      <SearchBarCharacter
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSearchSubmit}
      />

      <section className="articles-container">
        {data.results.map((character) => (
          <CharacterCard
            key={character._id}
            id={character._id}
            name={character.name}
            description={character.description}
            thumbnail={character.thumbnail}
            isFavorite={favoritesList.some(
              (fav) =>
                fav.marvelId === character._id && fav.type === "character"
            )}
            handleFavorite={() => handleFavorite(character._id, data)}
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
