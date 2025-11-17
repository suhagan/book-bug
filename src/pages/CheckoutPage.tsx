import { useState, type FormEvent } from "react";
import { useCart } from "../hooks/useCart";

export const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }
    clearCart();
    setMessage("Thank you for your order!");
  };

  return (
    <main className="page">
      <h1>Checkout</h1>
      {message && <p className="info-message">{message}</p>}

      <section className="checkout-section">
        <div className="order-summary">
          <h2>Order summary</h2>
          {items.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <>
              <ul>
                {items.map(({ book, quantity }) => (
                  <li key={book.id}>
                    {book.title} × {quantity} –{" "}
                    {book.price * quantity} SEK
                  </li>
                ))}
              </ul>
              <p className="order-total">Total: {totalPrice} SEK</p>
            </>
          )}
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Customer details</h2>
          <label>
            Full name
            <input type="text" required />
          </label>
          <label>
            Email
            <input type="email" required />
          </label>
          <label>
            Address
            <input type="text" required />
          </label>
          <label>
            City
            <input type="text" required />
          </label>
          <label>
            Zip code
            <input type="text" required />
          </label>

          <button type="submit" className="btn-primary">
            Place order
          </button>
        </form>
      </section>
    </main>
  );
};
