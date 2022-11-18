import { React, useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { createConsumer } from "@rails/actioncable"
import axios from 'axios'

import Navbar from "./Navbar";
import Footer from "./Footer";

function Chatbox({ unreadMessages, setUnreadMessages }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sentUser, setSentUser] = useState("");
  const [recipientUser, setRecipientUser] = useState("");
  const [loadMessages, setLoadMessages] = useState(false);
  const params = useParams();

  const curUser = JSON.parse(localStorage.getItem("user"));
  const cable = useRef();

  useEffect(() => {
    /* -------------------Get Conversation with Recipient------------------ */
    axios
      .get(`http://localhost:3000/conversations/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.user_a_id !== curUser.id) {
          setSentUser(res.data.user_b.username);
          setRecipientUser(res.data.user_a.username);
        }
        setMessages(res.data.messages);
        setLoadMessages(true);
      });
  }, [params.id, curUser.id]);

  useEffect(() => {
    /* -------------------Connection with Action Cable------------------- */
    if (!cable.current) {
      cable.current = createConsumer("http://localhost:3000/cable");
    }
    const paramsToSend = {
      channel: "ConversationChannel",
      id: params.id,
    };
    const handlers = {
      received(data) {
        if (data.message.user_id !== curUser.id) {
          console.log("in the head");
          const pkg = {
            msgbody: data.message.msgbody,
            conversation_id: data.message.conversation_id,
            id: data.message.id,
            user_id: data.message.user_id,
            read: true,
          };
          setMessages([...messages, pkg]);
          axios.patch(
            `http://localhost:3000/messages/${data.message.id}`,
            JSON.stringify({ read: true }),
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          );
        } else {
          console.log(data);
          const pkg = {
            msgbody: data.message.msgbody,
            conversation_id: data.message.conversation_id,
            id: data.message.id,
            user_id: data.message.user_id,
            read: 0,
          };
          setMessages([...messages, pkg]);
        }
      },
      connected() {
        console.log("connected");
      },
      disconnected() {
        console.log("disconnected");
        cable.current = null;
      },
    };
    console.log("subbing to ", params.id);
    const subscription = cable.current.subscriptions.create(
      paramsToSend,
      handlers
    );

    return function cleanup() {
      console.log("unsubbing from ", params.id);
      cable.current = null;
      subscription.unsubscribe();
    };
  }, [params.id, messages, curUser.id]);

  useEffect(() => {
    const filterMsgs = unreadMessages.filter((msg) => {
      return msg.conversation_id == params.id;
    });
    setUnreadMessages([...unreadMessages].filter((msg) => {
      return !filterMsgs.includes(msg);
    }));

    if (filterMsgs.length !== 0) {
      filterMsgs.forEach((msg) => {
        axios.patch(
          `http://localhost:3000/messages/${msg.id}`,
          JSON.stringify({ read: true }),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
      });
    }
  }, []);

  if (loadMessages) {
    const messagesReversed = [...messages].reverse();

    const renderMessages = messagesReversed.map((msg) => {
      if (msg.user_id === curUser.id) {
        return (
          <div className="sentMsg" key={msg.id}>
            {sentUser}
            <div className="sentMsg-temp">
              <p>{msg.msgbody}</p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="receivedMsg" key={msg.id}>
            {recipientUser}
            <div className="receivedMsg-temp">
              <p>{msg.msgbody}</p>
            </div>
          </div>
        );
      }
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (newMessage !== "") {
        const data = {
          msgbody: newMessage,
          conversation_id: params.id,
          user_id: curUser.id,
          read: 0,
        };
        setNewMessage("");

        fetch("http://localhost:3000/messages", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify(data),
        }).catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
      }
    };

    return (
      <div>
        <Navbar />
        <div className="conv-page-container chat-page">
          <div className="conv-page-content chat-page">
            <div className="message-container">{renderMessages}</div>
            <div className="message-form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                  className="message-input"
                />
                <button type="submit" className="message-button">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Chatbox;
