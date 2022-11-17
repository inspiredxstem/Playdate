import "./App.css";
import { React, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Pets from "./Pets";
import Inbox from "./Inbox";
import Chatbox from "./Chatbox";
import Profile from "./Profile";
import NotFound from "./NotFound";
import axios from "axios";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInbox, setUserInbox] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  
  function handleCurrentUser(user) {
    setCurrentUser(user)
    setUserInbox([...user.get_conversations])

    const allUnreadMessages = []
    user.get_conversations.forEach(conversation => {
      conversation.convo.unread_messages(message => {
        if(message.user_id !== user.id){
          allUnreadMessages.push(message)
        }
      })
    })
    setUnreadMessages([...allUnreadMessages])
  }

  useEffect(()=>{
    if(localStorage.getItem('jwt')){  
      axios
        .get("http://localhost:3000/me", { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`}})
        .then(res => {
          setCurrentUser(res.data)
          setUserInbox([...res.data.get_conversations])
        })
      }
    },[])
    

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleCurrentUser={handleCurrentUser}/>} />
        <Route path="/pets" element={<Pets currentUser={currentUser} userInbox={userInbox} setUserInbox={setUserInbox}/>} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/inbox/:id" element={<Chatbox currentUser={currentUser} unreadMessages={unreadMessages} setUnreadMessages={setUnreadMessages}/>} />
        {/* <Route path="/me" element={<Profile current={currentUser} />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
