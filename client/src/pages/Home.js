import React, {Suspense, useEffect, useState} from "react";
import Nav from "../components/Nav"
import "./style.css"
import MessageInput from "../components/MessageInput"
// import PublicMessage from "../components/PublicMessage"
import axios from "axios"
const PublicMessage = React.lazy(() => import("../components/PublicMessage"))

const Home = () => {
  const [messageState, setMessageState] = useState()
  const [messageCount, setMessageCount] = useState()
  // const [randomMessage, setRandomMessage] = useState()
  const PublicMessages = () => {
    axios.get("/message/messages")
    .then(res => {
      if (res.data) {
      const messages = res.data;
      // console.log(messages.reverse())
      setMessageState(messages.reverse())
      setMessageCount(messages.length)
      // setRandomMessage(messages[Math.floor(Math.random()*messages.length)].message)
      // console.log(randomMessage)
      // console.log(messages)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }


  useEffect(() => {
    PublicMessages()
  }, [])
  return (
   <>
   <Nav />
   <div id="hero">
<h2 id="welcome">Hi human, do you know what you’re grateful for today?</h2>
<p id="description"><strong>EVERYDAZE</strong> is the 1st public platform for grateful like-minded, really, really, really smart and sensitive geniuses like YOU.<br />
            By participating and celebrating out loud with your inspirational messages of appreciation,<br />
            you will set the tone and attract positive energy into your life.<br />
            STOP procrastinating and START right NOW!</p>
            </div>
            <MessageInput messageCount={messageCount}/>
            <Suspense fallback="Loading">
            <PublicMessage messageState={messageState}/>
            </Suspense>
            
   </>
  )
}

export default Home;