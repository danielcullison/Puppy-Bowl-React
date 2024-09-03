import React from "react";
import "./SearchBar.css";

const SearchBar = ({ query, onQueryChange }) => {
  const handleChange = (event) => {
    onQueryChange(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search players..."
      />
    </div>
  );
};

export default SearchBar;
