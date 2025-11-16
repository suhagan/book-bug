// src/data/books.ts
import type { Book } from "../types";

export const books: Book[] = [
  {
    id: "1",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    publishYear: 1999,
    price: 399,
    isbn: "978-0201616224",
    ageLimit: "12+",
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    publishYear: 2008,
    price: 359,
    isbn: "978-0132350884",
    ageLimit: "15+",
  },
  {
    id: "3",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    publishYear: 2008,
    price: 299,
    isbn: "978-0596517748",
    ageLimit: "12+",
  },
  {
    id: "4",
    title: "Refactoring",
    author: "Martin Fowler",
    publishYear: 2018,
    price: 449,
    isbn: "978-0134757599",
    ageLimit: "15+",
  },
  {
    id: "5",
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    publishYear: 1994,
    price: 499,
    isbn: "978-0201633610",
    ageLimit: "18+",
  },
];
