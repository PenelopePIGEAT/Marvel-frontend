import React from "react";
import "./SearchBar.css";

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
