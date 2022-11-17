import "./App.css";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Header from "./Header";
import Footer from "./Footer";

function Home() {
  const [regLogin, setRegLogin] = useState(true);

  const toggleRegLogin = () => {
    setRegLogin((current) => !current);
  };

  return (
    <div className="App">
      <Header />
      <div className="landing-container">
        <div className="landing-header-txt">Join the pack.</div>
        <div className="landing-body">
          Help man's best friend make some friends of his own—without braving
          the dog park.
        </div>
        <div className="reg-form">
          {regLogin ? (
            <div>
              <Register />
              <div className="p-container">
                <p>Have an account?</p>
                <p className="dark-link" onClick={toggleRegLogin}>
                  Login
                </p>
              </div>
            </div>
          ) : (
            <div>
              <Login />
              <div className="p-container">
                <p>Need to sign up?</p>
                <p className="dark-link" onClick={toggleRegLogin}>
                  Register
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
