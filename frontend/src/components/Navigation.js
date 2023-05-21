import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import { FaSearch } from "react-icons/fa";

import "./Navigation.css";
const Navbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-success"
      style={{ fontFamily: "sans-serif", fontWeight: "bold", fontSize: "20px" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: "#ffffff" }}>
          iHerb® - Official Site
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div className="input-group" style={{ height: "40px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search product name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ height: "100%" }}
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text"
                    id="search-icon"
                    style={{ height: "100%" }}
                  >
                    <FaSearch style={{ height: "100%" }} />
                  </span>
                </div>
              </div>
            </li>
            {user && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  style={{ color: "#ffffff" }}
                >
                  Home
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/productsform/"
                  style={{ color: "#ffffff" }}
                >
                  Add a Product
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/myProduct"
                  style={{ color: "#ffffff" }}
                >
                  My products
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item" onClick={handleClick}>
                <Link className="nav-link" style={{ color: "#ffffff" }}>
                  Logout
                </Link>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/signup"
                  style={{ color: "#ffffff" }}
                >
                  Signup
                </Link>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                  style={{ color: "#ffffff" }}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
