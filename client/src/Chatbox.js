import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { createConsumer } from "@rails/actioncable";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Chatbox() {


  return (
    <div>
      <Navbar />
      <div>
        <h1>Chatbox</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Chatbox;
