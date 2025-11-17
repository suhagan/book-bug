import React from "react";
import type { Book } from "../types";

interface ProductCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({ book, onAddToCart }) => {
  return (
    <article className="product-card">
      <h3 className="product-title">{book.title}</h3>
      <p className="product-author">{book.author}</p>

      <div className="product-meta">
        <span>Year: {book.publishYear}</span>
        <span>ISBN: {book.isbn}</span>
        <span>Age: {book.ageLimit}</span>
      </div>

      <div className="product-footer">
        <span className="product-price">{book.price} SEK</span>
        <button
          className="btn-primary"
          onClick={() => onAddToCart(book)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
};

// Memoize to avoid unnecessary re-renders
export const ProductCard = React.memo(ProductCardComponent);
