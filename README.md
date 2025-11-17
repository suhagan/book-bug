# BookBug – React + TypeScript Webshop

This project is a fully client-side **Book Webshop** built using **React (Vite + TypeScript)**.
It features:

- Product listing
- Search and filtering
- Shopping cart (persistent via localStorage)
- Checkout form
- Optimized re-render handling
- No unnecessary API calls

**Important Note:**
The given API (`http://10.100.3.140:3000/products`) was **not working** during development.
Therefore, this webshop is a **self-designed, custom implementation** based on creative problem-solving and frontend best practices.

---

## Tech Stack

- **React (Vite + TypeScript)**
- **CSS (responsive layout for mobile/tablet/desktop)**
- **Context API + Custom Hooks**
- **localStorage for persistent cart**
- **React Router DOM**

---

# How to Run the Project

```
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

# Folder Structure

```
src/
│
├── components/        # Reusable UI elements
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── SearchBar.tsx
│   ├── SortFilterBar.tsx
│
├── pages/             # Main pages rendered by React Router
│   ├── Home.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│
├── data/
│   └── books.ts       # Temporary product list since API was offline
│
├── hooks/
│   └── useLocalStorage.ts  # Custom hook to persist cart
│   └── useCart.ts  # Custom hook to persist cart
│
├── context/
│   └── CartContext.tsx     # Global cart store
│
├── types.ts           # Shared TypeScript types
│
├── App.tsx
├── main.tsx
└── index.css

```

This structure ensures **clean separation**, easy scalability, and predictable file locations.

---

# Features Overview

## Product Listing

Products are imported from `data/books.ts` (static data because API was unavailable).
They are displayed using a `ProductCard` component.

### How it works

- `Home.tsx` loads all books from the static file.
- It applies **search, filtering, sorting** using `useMemo` to avoid unnecessary recalculation.
- Each product is passed down to a `ProductCard`, which is wrapped in `React.memo` to prevent re-renders unless its props change.

---

## Search + Filter System

### Search supports:

- Book Name
- Author Name
- ISBN Number

### Filter supports:

- Starting letter (A–Z)
- Publish Year range
- Price sorting (Low→High, High→Low)

### How it works

#### SearchBar Component

Takes:

```ts
searchQuery;
searchField;
activeLetter;
```

And triggers callbacks:

```ts
onSearchQueryChange();
onSearchFieldChange();
onLetterChange();
```

#### SortFilterBar Component

Takes:

```ts
sortOption;
minYear;
maxYear;
```

And triggers:

```ts
onSortOptionChange();
onMinYearChange();
onMaxYearChange();
```

### Why use `useMemo`?

```ts
const filteredBooks = useMemo(() => { ... }, [
  searchQuery,
  searchField,
  activeLetter,
  sortOption,
  minYear,
  maxYear,
]);
```

- Prevents running filtering logic on every re-render.
- Only recalculates if a filter actually changed.
- Improves performance with large product lists.

---

## Shopping Cart (Global State)

### Tools Used:

- `CartContext.tsx` (global state)
- `useCart.ts` (custom hook)
- `useLocalStorage.ts` (persistent cart)

---

# Cart System Architecture

## ➤ CartContext

Centralized global state containing:

```ts
items: CartItem[]
totalItems: number
totalPrice: number
addToCart(book)
removeFromCart(bookId)
updateQuantity(bookId, qty)
clearCart()
```

### Why Context?

- Allows all pages (Home, Cart, Checkout) to access cart data.
- Avoids prop-drilling.
- Prevents duplicate state copies / unnecessary API work.

### Why `useCallback`?

Cart functions are wrapped in:

```ts
const addToCart = useCallback(...)
```

This ensures:
✔ Stable function reference
✔ No unnecessary re-renders in children
✔ `React.memo(ProductCard)` stays efficient

---

# useLocalStorage – Persistent Cart

```ts
export function useLocalStorage<T>(key, initialValue);
```

### Why?

- Keeps cart **even after page refresh**.
- No backend required.
- Avoids re-fetching or re-generating cart items.

### How it works

- On first load → reads from localStorage
- On updates → writes to localStorage automatically
- Used only inside CartContext → centralized persistence

---

# Custom Hook: useCart

```ts
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};
```

### Why it exists

- To simplify cart usage.
- Instead of writing:

```ts
const { addToCart } = useContext(CartContext);
```

You write:

```ts
const { addToCart } = useCart();
```

Cleaner, reusable, safer.

### Where it is called

- Inside ProductCard (Add to Cart button)
- In CartPage (update/remove items)
- In CheckoutPage (clear cart after purchase)

---

# Checkout Page

### Purpose:

- Simulates order submission
- Collects minimal customer info
- Clears shopping cart on completion

### How it works:

```ts
handleSubmit()
  → Validate cart
  → Clear cart via context
  → Show success message
```

No backend is needed; this is a frontend-only demonstration.

---

# Re-render Optimization Summary

| Feature             | Optimization Used      | Why                                           |
| ------------------- | ---------------------- | --------------------------------------------- |
| Product list        | `useMemo`              | Prevents heavy filtering logic on each render |
| AddToCart functions | `useCallback`          | Stable references prevent rerenders           |
| ProductCard         | `React.memo`           | Renders ONLY when props change                |
| Cart state          | Context + localStorage | No duplicate copies, no extra renders         |
| Search & filter     | Local state only       | Does not affect other components              |

**Result:**
The UI stays **fast, smooth, and efficient**, even with more products.

---

# Requirements Checklist

### Build a webshop

- Product list
- Search
- Filters
- Sorting
- Cart
- Checkout

### File Structure Rules

- Components → `/components`
- Pages → `/pages`
- Hooks → `/hooks`
- Context → `/context`
- Types → `/types.ts`

### Avoid unnecessary re-renders

- `useMemo`, `useCallback`, `React.memo`
- Shared data outside components

### Avoid unnecessary API calls

- No external API used
- Static product list
- Single source of truth (Context)

### Handle API issue

- Mentioned: API was unavailable → custom implementation used

---

# Future work

- Age limit based filter
- Call an external API

# Author

**Suhagan Mostahid**
Full project design, architecture, and implementation.
