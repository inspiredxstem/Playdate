import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({handleCurrentUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", { username, password })
      .then((r) => {
        handleCurrentUser(r.data.user)
        localStorage.setItem('jwt', r.data.token)
        localStorage.setItem("user", JSON.stringify(r.data.user))
        navigate("/pets")
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }

  return (
    <div>
      <Header />
      <div className="login-cont">
        <div className="log-form">
          <h2>Welcome back!</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              title="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              title="username"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">LOGIN</button>
            {/* <a className="forgot" href="#">Forgot Username?</a> */}
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
