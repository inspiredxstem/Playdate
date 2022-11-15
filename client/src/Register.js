import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   const handleRegister = (e) => {
  //     fetch("http://localhost:3000/users", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: username,
  //         password: password,
  //       }),
  //     });
  //   };

  function handleRegister(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users", { username, password })
      .then((r) => {
        console.log(r.data);
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
    <div className="reg-form">
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
          title="username"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">REGISTER</button>
        <div className="p-container">
          <p>Have an account?</p>
          <p>
            <a href="/login" className="dark-link">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
