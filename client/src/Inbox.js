import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";

function Inbox({ userInbox, unreadMessages }) {
  const curUser = localStorage.getItem("user");

  const inbox = userInbox.map((conversation) => {
    const filterMsgs = unreadMessages.filter((msg) => {
      return msg.conversation === conversation.convo.id;
    });
    if (conversation.convo.user_a_id === curUser.id) {
      if (filterMsgs.length === 0) {
        return (
          <NavLink
            to={`/inbox/${conversation.convo.id}`}
            key={conversation.convo.id}
          >
            <div>
              <p>
                Conversation with <span>{conversation.user_a_username}</span>
              </p>
            </div>
          </NavLink>
        );
      } else {
        return (
          <NavLink
            to={`/inbox/${conversation.convo.id}`}
            key={conversation.convo.id}
          >
            <div>
              <span>{filterMsgs.length}</span>
              <p>
                Conversation with <span>{conversation.user_a_username}</span>
              </p>
            </div>
          </NavLink>
        );
      }
    } else {
      if (filterMsgs.length === 0) {
        return (
          <NavLink
            to={`/inbox/${conversation.convo.id}`}
            key={conversation.convo.id}
          >
            <div>
              <p>
                Conversation with <span>{conversation.user_b_username}</span>
              </p>
            </div>
          </NavLink>
        );
      } else {
        return (
          <NavLink
            to={`/inbox/${conversation.convo.id}`}
            key={conversation.convo.id}
          >
            <div>
              <span>{filterMsgs.length}</span>
              <p>
                Conversation with <span>{conversation.user_b_username}</span>
              </p>
            </div>
          </NavLink>
        );
      }
    }
  });
  return (
    <div>
      <Navbar />
      <div>
        <div className="feed-container">
          <div className="profile-cont">
            <div className="profile-title">INBOX</div>
            <div className="profile-info">
                <div className="profile-subtitle">CONVERSATIONS</div>
                <div className="show-line" />
              </div>
            <div className="inbox-container">{inbox}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Inbox;
