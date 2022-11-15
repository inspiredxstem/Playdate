import "./App.css";
import { React, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Pets from "./Pets";
import Chat from "./Chat";
import Profile from "./Profile";
import NotFound from "./NotFound";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        // console.log(data);
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pets" element={<Pets users={users} />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/me" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
