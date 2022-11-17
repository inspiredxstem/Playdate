import { React, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PetCards from "./PetCards";
import axios from 'axios';

function Pets({currentUser, userInbox, setUserInbox}) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
      })
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  const petsDisplay = Array.from(users).map((users) => (
    <PetCards key={users.id} users={users} currentUser={currentUser} userInbox={userInbox} setUserInbox={setUserInbox}/>
  ));

  return (
    <div>
      <Navbar />
      <div className="feed-container">
        <div className="pet-feed">{petsDisplay}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Pets;
