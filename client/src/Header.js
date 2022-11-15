import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div className="App-header">
        <Link to="/">
          <img src="playdate-wide-trans.png" className="App-logo" alt="logo" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
