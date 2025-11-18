import { Link, NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export const Header: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="signup-link">
        New here?{" "}
        <Link 
          to="/register/step-1" 
          className="signup-anchor"
        >
          Sign Up
        </Link>
      </div>
      <div className="header-inner">
        <Link to="/" className="logo">
          BookBug
        </Link>
        <nav className="nav">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/cart" className="nav-link">
            Cart ({totalItems})
          </NavLink>
          <NavLink to="/checkout" className="nav-link">
            Checkout
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
