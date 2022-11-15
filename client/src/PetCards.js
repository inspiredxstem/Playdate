import { React, useState } from "react";
import { Link } from "react-router-dom";

// Will probably change styling, I want the cards to be smaller and maybe be 4 across? idk

function PetCards({ users }) {
  return (
    <div>
      <div className="card">
        <div>
          <img className="profile-pic" src={users.profile_pic} />
        </div>
        <div className="pet-info">
          <div className="pet-title">
            <div className="pet-name">
              {users.name}, {users.age}
            </div>
            <div>
              <Link className="chat-link" to="/inbox">
                {/* Will change the chat link when I have the messaging components up and running */}
                <i className="bx bxs-envelope"></i>
              </Link>
            </div>
          </div>
          {/* <div className="pet-details">{users.location}</div> */}
          <div className="pet-details">New York, NY</div>
          <div className="pet-bio">{users.bio}</div>
          <div className="pet-gender">
            <div className="pet-details">GENDER</div>
            <div>{users.gender}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetCards;
