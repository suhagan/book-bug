import { useMemo, useState, useCallback } from "react";
import { books } from "../data/books";
import { ProductCard } from "../components/ProductCard";
import { SearchBar } from "../components/SearchBar";
import { SortFilterBar } from "../components/SortFilterBar";
import { useCart } from "../hooks/useCart";
import type { Book } from "../types";

type SortOption = "none" | "price-asc" | "price-desc";

export const Home: React.FC = () => {
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState<"title" | "author" | "isbn">(
    "title"
  );
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("none");
  const [minYear, setMinYear] = useState<number | "">("");
  const [maxYear, setMaxYear] = useState<number | "">("");

  const handleAddToCart = useCallback(
    (book: Book) => {
      addToCart(book);
    },
    [addToCart]
  );

  const filteredBooks = useMemo(() => {
    let result = [...books];

    // search by selected field
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((book) => {
        if (searchField === "title") {
          return book.title.toLowerCase().includes(query);
        }
        if (searchField === "author") {
          return book.author.toLowerCase().includes(query);
        }
        if (searchField === "isbn") {
          return book.isbn.toLowerCase().includes(query);
        }
        return true;
      });
    }

    // filter by starting letter of title
    if (activeLetter) {
      result = result.filter((book) =>
        book.title.toUpperCase().startsWith(activeLetter)
      );
    }

    // filter by publish year range
    if (minYear !== "") {
      result = result.filter((book) => book.publishYear >= minYear);
    }
    if (maxYear !== "") {
      result = result.filter((book) => book.publishYear <= maxYear);
    }

    // sort by price
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, searchField, activeLetter, sortOption, minYear, maxYear]);

  return (
    <main className="page">
      <section className="hero">
        <h1>Welcome to BookBug</h1>
        <p>Find your next favorite book and enjoy being a book eating bug.</p>
      </section>

      <section className="filters-section">
        <SearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          searchField={searchField}
          onSearchFieldChange={setSearchField}
          activeLetter={activeLetter}
          onLetterChange={setActiveLetter}
        />

        <SortFilterBar
          sortOption={sortOption}
          onSortOptionChange={setSortOption}
          minYear={minYear}
          maxYear={maxYear}
          onMinYearChange={setMinYear}
          onMaxYearChange={setMaxYear}
        />
      </section>

      <section className="products-grid">
        {filteredBooks.length === 0 ? (
          <p>No books found. Try changing your filters.</p>
        ) : (
          filteredBooks.map((book) => (
            <ProductCard
              key={book.id}
              book={book}
              onAddToCart={handleAddToCart}
            />
          ))
        )}
      </section>
    </main>
  );
};
