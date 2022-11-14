import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/login", { username, password })
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
        console.log('Error', error.message);
      }
    });
  }

  return (
    <>
      <div class="log-form">
        <h2>Login to your account</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" title="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" title="username" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" class="btn">Login</button>
          {/* <a class="forgot" href="#">Forgot Username?</a> */}
        </form>
      </div> 
    </>
  );
}

export default App;
