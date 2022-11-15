import "./App.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar sticky">
      <Link to="/">
        <img src="playdate-wide-trans.png" className="nav-logo" alt="logo" />
      </Link>
      <nav className="links">
        <Link className="MailLink" to="/chat">
          <i className="bx bxs-envelope"></i>
        </Link>

        <Link className="FeedLink" to="/pets">
          <i className="bx bxs-dog"></i>
        </Link>

        <Link className="ProfileLink" to="/me">
          <i className="bx bxs-user"></i>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
