import { useCart } from "../hooks/useCart";

export const CartPage: React.FC = () => {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();

  return (
    <main className="page">
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {items.map(({ book, quantity }) => (
            <div className="cart-item" key={book.id}>
              <div>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>Price: {book.price} SEK</p>
                <p>ISBN: {book.isbn}</p>
              </div>
              <div className="cart-actions">
                <label>
                  Qty:
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      updateQuantity(book.id, Number(e.target.value))
                    }
                  />
                </label>
                <button
                  className="btn-secondary"
                  onClick={() => removeFromCart(book.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p>Total: {totalPrice} SEK</p>
          </div>
        </div>
      )}
    </main>
  );
};
