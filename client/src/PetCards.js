import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './index.css'

// Will probably change styling, I want the cards to be smaller and maybe be 4 across? idk

function PetCards({ users, currentUser, userInbox, setUserInbox }) {
  const navigate = useNavigate()
  
  function handleClick(user){
    const convoExist = userInbox.find((conversation) => {
      if(conversation.convo.user_a_id === currentUser.id && conversation.convo.user_b_id === user.id){
        return conversation
      } else if(conversation.convo.user_b_id === currentUser.id && conversation.convo.user_a_id === user.id){
        return conversation
      } else {
        return;
      }
    })

    if(convoExist){
      console.log("It worked")
      navigate(`/inbox/${users.id}`)
    } else {
      console.log("It does not work")
      axios.post("http://localhost:3000/conversations", { user_a_id: currentUser.id, user_b_id: user.id} )
      .then(res => {
        console.log(res.data) 
        const convoData = {
              convo: res.data,
              user_a_username: currentUser.username,
              user_b_username: user.username
            }
            setUserInbox([...userInbox, convoData])
      }).catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        })
      
    }
  }

  return (
    <div>
      <div className="card">
        <div>
          <img className="profile-pic" src={users.profile_pic} />
        </div>
        <div className="pet-info">
          <div className="pet-title">
            <div className="pet-name">
              {users.username}, {users.age}
            </div>
            <div>
              <div className="chat-link" onClick={() => {handleClick(users)}}>
                {/* Will change the chat link when I have the messaging components up and running */}
                <i className="bx bxs-envelope"></i>
              </div>
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
