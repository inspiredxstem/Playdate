import "./App.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function signOut() {
    if (localStorage.getItem("jwt")) {
      localStorage.clear();
      console.log("You have successfully logged out");
      navigate("/");
      window.location.reload();
    }
  }

  return (
    <div className="navbar sticky">
      <Link to="/pets">
        <img src="/playdate-wide-trans.png" className="nav-logo" alt="logo" />
      </Link>
      <nav className="links">
        <Link className="nav-link" to="/inbox">
          <i className="bx bxs-envelope"></i>
        </Link>

        <Link className="nav-link" to="/pets">
          <i className="bx bxs-dog"></i>
        </Link>

        <Link className="nav-link" to="/me">
          <i className="bx bxs-user"></i>
        </Link>
        <div className="nav-link" onClick={signOut}>
          <i className="bx bxs-log-out"></i>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
