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
        console.error("Erreur lors du fetch :", error);
      }
    };

    fetchData();
  }, [page, searchTerm]);

  const handleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const changePage = (newPage) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("page", newPage);
    newParams.set("search", searchTerm);
    navigate(`${location.pathname}?${newParams.toString()}`);
  };

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
            isFavorite={favorites.includes(character._id)}
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
