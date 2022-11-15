import { React, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// this is kind of ugly, will fix later

function Profile({ current }) {
  return (
    <div>
      <Navbar />
      <div className="feed-container">
        <div className="profile-cont">
          <div className="profile-title">account details</div>
          <div className="profile-subtitle">user info</div>
          <div className="profile-info">
            <div className="profile-category">username</div>
            {/* <div className="profile-values">{current.username}</div> */}
            <div className="profile-values">test</div>
            <div className="profile-category">password</div>
            <div className="profile-values">test</div>
          </div>
          {/* <div className="line"></div> */}
          <div className="profile-subtitle">pet info</div>
          <div className="profile-info">
            <div className="profile-category">name</div>
            <div className="profile-values">test</div>
            <div className="profile-category">bio</div>
            <div className="profile-values">test</div>
            <div className="profile-category">age</div>
            <div className="profile-values">test</div>
            <div className="profile-category">gender</div>
            <div className="profile-values">test</div>
            <div className="profile-category">species</div>
            <div className="profile-values">test</div>
            <div className="profile-category">profile picture</div>
            <div className="profile-values">test</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
