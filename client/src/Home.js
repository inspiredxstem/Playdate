import "./App.css";
import Register from "./Register";
import Header from "./Header";

function Home() {
  return (
    <div className="App">
      <Header />
      <div className="landing-container">
        <div className="landing-header-txt">Join the pack.</div>
        <div className="landing-body">testing testing lorem ipsum etc</div>
        <Register />
      </div>
    </div>
  );
}

export default Home;
