import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { NavLink } from "react-router-dom"
import { createConsumer } from "@rails/actioncable"
import axios from 'axios'

import Navbar from "./Navbar";
import Footer from "./Footer";

function Chatbox({users, currentUser}) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [recipientUser, setRecipientUser] = useState("")
  const [loadMessages, setLoadMessages] = useState(false)
  const params = useParams()

  const curUser = JSON.parse(localStorage.getItem("user"))
  console.log(curUser)
  const cable = useRef()

  useEffect(() => {
    /* -------------------Get Conversation with Recipient------------------ */
    axios.get(`http://localhost:3000/conversations/${params.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}`}})
    .then(res => {
      if(res.data.user_a_id === curUser.id){
        console.log(`Hey ${res.data.user_b.username}`)
        // setRecipientUser(data.user_b.username)
      } else {
        console.log(`Hello ${res.data.user_a.username}`)
        // setRecipientUser(data.user_a.username)
      }
      setMessages(res.data.messages)
      setLoadMessages(true)
    })
  }, [params.id, curUser.id])

  useEffect(()=>{
    /* --------------Connection with Action Cable Channels-------------- */
    if(!cable.current){
        cable.current = createConsumer("ws://localhost:3000/cable")
    }

    const paramsToSend = {
        channel: "ConversationChannel",
        id: params.id
    }

    const handlers = {
        recevied(data){
          if(data.message.user_id !== curUser.id){
            const pkg = {
              id: data.message.id,
              msgbody: data.message.msgbody,
              read: true,
              user_id: data.message.user_id, 
              conversation_id: data.message.conversation_id
              // current_user_username: data.user_username
            }
            setMessages([...messages, pkg])
          } else {
            const pkg = {
              id: data.message.id,
              msgbody: data.message.msgbody,
              read: false,
              user_id: data.message.user_id, 
              conversation_id: data.message.conversation_id
              // current_user_username: data.user_username
            }
            setMessages([...messages, pkg])
          }
        },
        connected(){
            console.log("Connected")
        },
        disconnected(){
            console.log("Disconnected")
            cable.current = null
        }
    }

    const subscription = cable.current.subscriptions.create(paramsToSend, handlers)

    return function cleanup(){
        console.log("unsubbing from", params.id)
        cable.current = null
        subscription.unsubscribe()
    }
  },[params.id, messages, curUser.id])

  if(loadMessages){
    const messagesReversed = [...messages].reverse()

    const renderMessages = messagesReversed.map((msg)=>{
      if(msg.user_id === curUser.id){
        return(
          <div className="sentMsg" key={msg.id}>
            <p>{msg.msgbody}</p>
          </div>
        )
      } else {
        return(
          <div className="receivedMsg" key={msg.id}>
            <p>{msg.msgbody}</p>
          </div>
        )
      }
    })

    console.log(messagesReversed)
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(`Help ${JSON.parse(JSON.stringify(messagesReversed))}`)
      if(newMessage !== ""){
        const data = {
          msgbody: newMessage,
          conversation_id: params.id,
          user_id: curUser.id,
          read: false
        }
        console.log(data)
        setNewMessage("")
  
        fetch("http://localhost:3000/messages", {
          method: "POST",
          headers: {
            "content-type" : "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("jwt")}`
          },
          body: JSON.stringify({
            msgbody: newMessage,
            conversation_id: params.id,
            user_id: curUser.id 
          })
        })
        .then(res => {
          console.log(res)
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
        <Navbar />
        {/* <div className="conv-page-container chat-page">
          <h1>Chatbox</h1>
        </div> */}
  
        <div className="conv-page-container chat-page">
          <div className="conv-page-content chat-page">
            <div className="message-container">
              {renderMessages}
            </div>
            <div className="message-form">
              <form onSubmit={handleSubmit}>
                <input type="text" value={newMessage} onChange={(e)=>{ setNewMessage(e.target.value)}} className="message-input"/>
                <button type="submit" className="message-button">Send</button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  
}

export default Chatbox;
