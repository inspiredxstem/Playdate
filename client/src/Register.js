import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users", {
        username,
        password,
        // password_confirmation: password,
      })
      .then((r) => {
        const loggedInUser = r.data;
        localStorage.setItem("jwt", loggedInUser.token);
        localStorage.setItem("current_user", JSON.stringify(loggedInUser));
        const current_user = ("current_user", loggedInUser.user);
        // setCurrentUser(current_user);
        console.log(`Welcome, @${current_user.username}!`);
        navigate("/me");
        // localStorage.setItem('jwt', r.data.token)
        // localStorage.setItem("user", JSON.stringify(r.data.user))
        // navigate("/pets");
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
      <form onSubmit={handleRegister}>
        <input
          type="text"
          title="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          title="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          title="password_confirmation"
          placeholder="confirm password"
          // value={passwordConfirmation}
          // onChange={(e) => setPasswordConfirmation(e.target.value)}
          // this isn't functional yet
        />
        <button type="submit">REGISTER</button>
      </form>
    </div>
  );
}

export default Register;
