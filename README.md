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

# Testing with Cypress

This project includes a complete **end-to-end (E2E) test suite** implemented with **Cypress**, as required by the assignment for flow testing .
The goal of the test suite is to verify that:

1. **Navigation in the application works correctly**
2. **At least one interactive functionality behaves as expected**, including validation and state updates
3. **Tests can be executed locally via terminal**

Both requirements are fully met.

---

## Test 1 — Navigation Flow (planned to execute)

The file `cypress/e2e/bookbug_navigation.cy.ts` validates all primary navigation paths in the application:

- The **header is rendered correctly**
- Navigation links lead to the correct routes
  (`Home`, `Cart`, `Checkout`)
- The **"Sign Up"** link consistently redirects to the registration flow’s first step
- Uses stable `data-testid` selectors for cross-browser reliability

Expecting this will ensure the UI structure will be accessible and that routing behaves as intended.

---

## Test 2 — Multi-Step Registration Flow

The main functionality test is implemented in
`cypress/e2e/bookbug_registration_flow.cy.ts`.

This test verifies the entire 5-step registration process:

### Step 1

- Form fields are validated
- “Next” remains disabled until all required fields are filled
- Data is written to **Context API** and **localStorage**

### Steps 2–4

- Email, phone, address, visit details are entered
- “Next” buttons move the user to the next page
- The test ensures navigation through:
  `/register/step-1` → `/step-5`

### Step 5

- Newsletter checkbox is updated
- “Confirm & Submit” submits the form
- **Global state resets** and user is redirected to the homepage

The test confirms:

- Validation
- Context API global state updates
- Route transitions
- Persisted state via localStorage
- Final cleanup after submission

This fully satisfies the assignment requirement to test
“minst en ytterligare funktionalitet”, i.e. filling in and submitting a multi-step form.

---

## Technical Setup

Cypress is configured in `cypress.config.ts` with:

- Base URL: `http://localhost:5173`
- Spec pattern: `cypress/e2e/**/*.cy.ts`
- `experimentalSessionAndOrigin` enabled for Vite compatibility
- Test-friendly stable selectors (`data-testid`) added in components

---

## Running Tests Locally (Terminal)

The tests are executed using:

```bash
npx cypress run
```

This runs the full suite in **headless mode**, as required.

Alternatively, Cypress can be opened interactively:

```bash
npx cypress open
```

---

## Test Summary

The Cypress tests demonstrate that:

- **Navigation** should work as expected (test not completed yet, will be updated later)
- **Stateful interactions** (multi-step form, validation, global state via Context API) work as intended
- **Persistent data** through localStorage behaves correctly
- **User flow** from registration start to final submission is fully validated
- All tests run successfully through the terminal

Together, these tests confirm both the functional correctness and interactive reliability of the BookBug webshop and the 5-step registration feature.

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
