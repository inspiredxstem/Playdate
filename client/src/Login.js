import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [currentUser, setCurrentUser] = useState([]);
  // const [isLoggedin, setIsLoggedin] = useState(false);

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", { username, password })
      .then((r) => {
        const loggedInUser = r.data;
        localStorage.setItem("jwt", loggedInUser.token);
        localStorage.setItem("current_user", JSON.stringify(loggedInUser));
        const current_user = ("current_user", loggedInUser.user);
        // setCurrentUser(current_user);
        console.log(`Hi, @${current_user.username}!`);
        navigate("/pets");
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
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
      </form>
    </div>
  );
}

export default Login;
