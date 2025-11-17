import React from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  searchField: "title" | "author" | "isbn";
  onSearchFieldChange: (value: "title" | "author" | "isbn") => void;
  activeLetter: string | null;
  onLetterChange: (letter: string | null) => void;
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchQueryChange,
  searchField,
  onSearchFieldChange,
  activeLetter,
  onLetterChange,
}) => {
  return (
    <div className="search-bar">
      <div className="search-row">
        <input
          className="search-input"
          type="text"
          placeholder={`Search by ${searchField}...`}
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
        />
        <select
          className="search-select"
          title="Search field"
          aria-label="Search field"
          value={searchField}
          onChange={(e) =>
            onSearchFieldChange(e.target.value as "title" | "author" | "isbn")
          }
        >
          <option value="title">Book name</option>
          <option value="author">Author</option>
          <option value="isbn">ISBN</option>
        </select>
      </div>

      <div className="letter-filter">
        <button
          className={`letter-btn ${activeLetter === null ? "active" : ""}`}
          onClick={() => onLetterChange(null)}
        >
          All
        </button>
        {letters.map((letter) => (
          <button
            key={letter}
            className={`letter-btn ${activeLetter === letter ? "active" : ""}`}
            onClick={() => onLetterChange(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};
