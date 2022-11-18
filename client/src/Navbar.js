import "./App.css";
import { Link,useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate()

  function signOut(){
    if(localStorage.getItem('jwt')){
      localStorage.clear()
      navigate('/')    
    }
  }

  return (
    <div className="navbar sticky">
      <Link to="/pets">
        <img src="/playdate-wide-trans.png" className="nav-logo" alt="logo" />
      </Link>
      <nav className="links">
        <Link className="MailLink" to="/inbox">
          <i className="bx bxs-envelope"></i>
        </Link>

        <Link className="FeedLink" to="/pets">
          <i className="bx bxs-dog"></i>
        </Link>

        <Link className="ProfileLink" to="/me">
          <i className="bx bxs-user"></i>
        </Link>
        <div onClick={signOut}>
          LogOut
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
