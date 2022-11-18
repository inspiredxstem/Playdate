import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

// hahahahahhaa I got this to slightly work and then changed smth else and forgot what I did and now it's broken again

function PetCards({ users, userInbox, setUserInbox }) {
  const navigate = useNavigate();
  const curUser = JSON.parse(localStorage.getItem("user"));

  // const findConvoId = curUser.get_conversations.forEach(conversation => {
  //   conversation.convo.find(con => {
  //     if(conversation.convo.user_b_id === curUser.id){
  //       return conversation.convo.id
  //     }})
  //   })
  // console.log(findConvoId)

  function handleClick(user) {
    console.log(`This is User: ${curUser.id}`);
    const convoExist = userInbox.find((conversation) => {
      if (
        conversation.convo.user_a_id === curUser.id &&
        conversation.convo.user_b_id === user.id
      ) {
        return conversation;
      } else if (
        conversation.convo.user_b_id === curUser.id &&
        conversation.convo.user_a_id === user.id
      ) {
        return conversation;
      } else {
        return;
      }
    });
    console.log(user);
    if (convoExist) {
      console.log("It worked");
      navigate(`/inbox/${convoExist.convo.id}`);
    } else {
      console.log("It does not work");
      axios
        .post(
          "http://localhost:3000/conversations",
          { user_a_id: curUser.id, user_b_id: user.id },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
          }
        )
        .then((res) => {
          console.log(res.data);
          const convoData = {
            convo: res.data,
            user_a_username: curUser.username,
            user_b_username: user.username,
          };
          setUserInbox([...userInbox, convoData]);
          navigate(`/inbox/${res.data.id}`);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
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
              {users.name}, {users.age}
            </div>
            <div>
              <div
                className="chat-link"
                onClick={() => {
                  handleClick(users);
                }}
              >
                <i className="bx bxs-envelope"></i>
              </div>
            </div>
          </div>
          {/* <div className="pet-details">{users.location}</div> */}
          <div className="pet-location">New York, NY</div>
          <div className="pet-bio">{users.bio}</div>
          <div className="pet-bottom">
            <div className="pet-gender">
              <div className="pet-details">GENDER</div>
              <div>{users.gender}</div>
            </div>
            <div className="pet-user">
              <div>@{users.username}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetCards;
