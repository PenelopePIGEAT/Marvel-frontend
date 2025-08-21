import { useState, useEffect } from "react";
import axios from "axios";

const SearchBarCharacter = ({ value, onChange, onSubmit }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!value) return setSuggestions([]);

    const timeout = setTimeout(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?search=${value}&page=1`
        );
        setSuggestions(response.data.results.map((c) => c.name).slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(value);
    }
  };

  return (
    <div>
      <input
        type="text"
        list="characters-list"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Rechercher un personnage"
      />
      <datalist id="characters-list">
        {suggestions.map((name, i) => (
          <option key={i} value={name} />
        ))}
      </datalist>
    </div>
  );
};

export default SearchBarCharacter;
