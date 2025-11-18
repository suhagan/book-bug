# BookBug – React + TypeScript Webshop + Multi-Step Registration (Context API)

BookBug is a React + TypeScript **Book Webshop** enhanced with a full **5-step user registration flow** built with **Context API**, **React Router**, and **localStorage**.

The project demonstrates:

- Dynamic product listing
- Search & filter system
- Shopping cart with global state
- Checkout
- **Multi-step registration form** (Context API + routing + persistence)
- Optimized re-rendering and component design

---

# Tech Stack

- **React (Vite + TypeScript)**
- **React Router DOM**
- **Context API**
- **Custom Hooks**
- **CSS (responsive UI)**
- **localStorage (persistent states)**

---

# How to Run

```bash
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

# Updated Project Structure

```
src/
│
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── SearchBar.tsx
│   ├── SortFilterBar.tsx
│   │
│   ├── form/                # Multi-step form components
│   │    ├── Step1PersonalData.tsx
│   │    ├── Step2ContactData.tsx
│   │    ├── Step3Address.tsx
│   │    ├── Step4Visit.tsx
│   │    ├── Step5Summary.tsx
│   │
│   └── common/
│        └── CancelModal.tsx   # Reusable confirmation modal
│
├── pages/
│   ├── Home.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│
├── context/
│   ├── CartContext.tsx
│   └── FormContext.tsx        # Global registration form state
│
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useCart.tsform context
│
├── data/
│   └── books.ts               # Temporary product data (API offline)
│
├── types/
│   └── FormTypes.ts           # Strong typing for form data
│
├── App.tsx
├── main.tsx
└── index.css

```

---

# Webshop Features

## Product Listing

Based on static `books.ts`.
Displayed using memoized `ProductCard` components.

## Search System

Search by:

- Title
- Author
- ISBN

Multiple filters using `useMemo` for optimal performance.

## A–Z Letter Filter

Filter by starting letter of book title.

## Sorting

Sort by:

- Price (low → high / high → low)
- Publish year range

## Shopping Cart

Global state via `CartContext`.

Implemented using:

- `useLocalStorage` (persistent cart)
- `useCart` custom hook
- `React.memo` optimization
- `useCallback` to stabilize update functions

## Checkout

Simulated order system that clears cart on completion.

---

# New Feature: Multi-Step Registration Form (5 Steps)

Implemented using:

- **Context API** (single global `formData`)
- **React Router** (each step has its own URL)
- **localStorage** (persistent form)
- **CSS animations** (slide in/out)
- **Cancel confirmation modal**
- **Full validation**
- **No props passed between steps**

### Steps:

1. **Personal Data**
   First name, last name, date of birth, gender
2. **Contact Information**
   Email, phone number
3. **Address**
   Street, zip code, city
4. **Visit Details**
   Purpose of visit, department
5. **Summary & Confirmation**
   Displays all entered data + Newsletter checkbox

### Why Context API?

- Avoids prop-drilling
- Ensures every step accesses the same global state
- Syncs updates instantly between components
- Simplifies storing + loading form state

### Why Routing?

Each step has its own URL:

```
/register/step-1
/register/step-2
/register/step-3
/register/step-4
/register/step-5
```

Better UX + easier debugging.

### Why localStorage?

- Form persists after refresh
- User can return later
- Makes the registration flow feel real and stable

---

# FormContext Architecture

`FormProvider` contains:

```ts
formData; // global state object
updateField(); // generic field updater
resetForm(); // reset after submit
```

### Load/Save Logic:

```ts
useEffect(() => {
  localStorage.setItem("bookBugFormData", JSON.stringify(formData));
}, [formData]);
```

### Access from components:

```tsx
const { formData, updateField } = useFormContext();
```

---

# Cancel Confirmation Modal

A reusable component living in `/common/CancelModal.tsx`.

It shows:

- Warning message
- “Yes, Cancel” → navigate back
- “No, Continue” → close modal

Used in all 5 steps.

---

# UX Enhancements

- Slide-in / slide-out animations between steps
- Disabled Next button until validation passes
- Modal fade-in animation
- Clean CSS layout for forms
- “New here? Sign Up” link added to header for integration with webshop

---

# Re-render Optimization Summary

| Feature      | Optimization                          |
| ------------ | ------------------------------------- |
| Product list | `useMemo`                             |
| ProductCard  | `React.memo`                          |
| Cart context | `useCallback` hooks                   |
| Form context | Single global state                   |
| Modal        | Conditional rendering (`return null`) |

---

# Future Improvements

- Connect registration data to a backend API
- Add user login + authentication
- Create a user dashboard to edit submitted data
- Add unit tests with Vitest
- Add form progress bar
- Age limit based filter

---

# Author

**Suhagan Mostahid**
– Full implementation, architecture, and UI/UX design.
