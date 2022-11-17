import "./App.css";
import { React, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Pets from "./Pets";
import Inbox from "./Inbox";
import Chat from "./Chat";
import Profile from "./Profile";
import NotFound from "./NotFound";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
  }, []);

  // useEffect(() => {
  //   axios.get("http://localhost:3000/me").then((res) => {
  //     console.log(res.data);
  //     setCurrentUser(res.data);
  //   });
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pets" element={<Pets users={users} />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/inbox/:id" element={<Chat />} />
        <Route path="/me" element={<Profile users={users} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
