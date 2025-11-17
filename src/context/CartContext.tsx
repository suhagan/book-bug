import React, { createContext, useCallback } from "react";
import type { CartItem, Book } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useLocalStorage<CartItem[]>("book-shop-cart", []);

  const addToCart = useCallback((book: Book) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
  }, [setItems]);

  const removeFromCart = useCallback((bookId: string) => {
    setItems((prev) => prev.filter((item) => item.book.id !== bookId));
  }, [setItems]);

  const updateQuantity = useCallback((bookId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.book.id === bookId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, [setItems]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  const value: CartContextValue = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext };