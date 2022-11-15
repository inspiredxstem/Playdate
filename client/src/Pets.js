import { React, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PetCards from "./PetCards";

function Pets({ users }) {
  const petsDisplay = Array.from(users).map((users) => (
    <PetCards key={users.id} users={users} />
  ));

  // console.log(petsDisplay);

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
