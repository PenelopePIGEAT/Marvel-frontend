import React from "react";
import "./SearchBar.css";

// - searchTerm : texte actuel de la recherche
// - onSearchChange : fonction appelée quand le texte change
// - className : pour personnalisation
const SearchBarCharater = ({ searchTerm, onSearchChange, className = "" }) => {
  return (
    <input
      type="text"
      className={`searchbar ${className}`}
      placeholder="Projet Advengers ..."
      value={searchTerm}
      onChange={(event) => onSearchChange(event.target.value)}
    />
  );
};

export default SearchBarCharater;
