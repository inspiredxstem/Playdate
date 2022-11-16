import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { createConsumer } from "@rails/actioncable";
import axios from "axios";

function ConversationPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const params = useParams();

  const cable = useRef();

  useEffect(() => {
    if (!cable.current) {
      cable.current = createConsumer("ws://localhost:3000/cable");
    }

    const paramsToSend = {
      channel: "ConversationChannel",
      id: params.id,
    };

    const handlers = {
      recevied(data) {
        setMessages([...messages, data]);
      },
      connected() {
        console.log("Connected");
      },
      disconnected() {
        console.log("Disconnected");
        cable.current = null;
      },
    };

    const subscription = cable.subscriptions.create(paramsToSend, handlers);

    return function cleanup() {
      console.log("unsubbing from", params.id);
      cable.current = null;
      subscription.unsubscribe();
    };
  }, [params.id, messages]);

  // const handleSubmit = (e) => {
  //     setNewMessage
  // }
}

export default ConversationPage;
