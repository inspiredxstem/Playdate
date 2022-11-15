import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <Header />
      <div className="error">
        <h1>Looks like that page doesn't exist.</h1>
        <Link className="error-link" to="/">
          go back home
        </Link>
        <Footer />
      </div>
    </div>
  );
}

export default NotFound;
