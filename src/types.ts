export interface Book {
  id: string;           // internal book id
  title: string;
  author: string;
  publishYear: number;
  price: number;
  isbn: string;
  ageLimit: string;     // e.g. "12+", "18+"
}

export interface CartItem {
  book: Book;
  quantity: number;
}
