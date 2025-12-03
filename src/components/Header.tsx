import { Link, NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export const Header: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <header className="header" data-testid="header">
      <div className="signup-link">
        New here?{" "}
        <Link
          to="/register/step-1"
          className="signup-anchor"
          data-testid="signup-link"
        >
          Sign Up
        </Link>
      </div>
      <div className="header-inner">
        <Link to="/" className="logo" data-testid="logo">
          BookBug
        </Link>
        <nav className="nav" data-testid="main-nav">
          <NavLink to="/" className="nav-link" data-testid="nav-home">
            Home
          </NavLink>
          <NavLink to="/cart" className="nav-link" data-testid="nav-cart">
            Cart ({totalItems})
          </NavLink>
          <NavLink
            to="/checkout"
            className="nav-link"
            data-testid="nav-checkout"
          >
            Checkout
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
