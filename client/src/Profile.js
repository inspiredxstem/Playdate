import react from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// this is kind of ugly, will fix later

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="feed-container">
        <div className="profile-cont">
          <div className="profile-title">Account</div>
          <div className="profile-info">
            <div>test</div>
            <div>test</div>
            <div>test</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
