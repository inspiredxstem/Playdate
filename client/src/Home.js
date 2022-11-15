import "./App.css";
import Register from "./Register";

function Home() {
  return (
    <div className="App">
      <div className="App-header">
        <img src="playdate-wide-trans.png" className="App-logo" alt="logo" />
      </div>
      <div className="landing-container">
        <div className="landing-header-txt">Join the pack.</div>
        <div className="landing-body">testing testing lorem ipsum etc</div>
        <Register />
      </div>
    </div>
  );
}

export default Home;
