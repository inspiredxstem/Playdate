import logo from './logo.svg';
import ConversationPage from './ConversationPage'
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Router, Route, useNavigate} from 'react-router-dom'

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loggedInUser, setLoggedInUser] = useState(null)

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:3000/login", { username, password })
    .then((r) => {
      console.log(r.data);
      localStorage.setItem("jwt", r.data.token)
      // useNavigate()
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
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

      <Router>
        <Route exact path='/'>
          {/* <Chat /> */}
        </Route>
      </Router>
    </>
  );
}

export default App;
