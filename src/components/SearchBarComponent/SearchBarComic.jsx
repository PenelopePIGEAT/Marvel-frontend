import { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";

const SearchBarComic = ({ searchTerm, onSearchChange }) => {
  const [inputValue, setInputValue] = useState(searchTerm || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.trim() === "") {
        setSuggestions([]);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?search=${inputValue}&page=1`
        );
        setSuggestions(response.data.results.slice(0, 5));
      } catch (error) {
        console.error("Erreur auto-complétion :", error);
      }
    };

    const debounce = setTimeout(() => fetchSuggestions(), 300);
    return () => clearTimeout(debounce);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (title) => {
    setInputValue(title);
    onSearchChange(title);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearchChange(inputValue);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Rechercher un comic..."
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((comic) => (
            <li
              key={comic._id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(comic.title)}
            >
              {comic.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBarComic;
