import React, {useState} from "react"
import axios from "axios";
import "./style.css"
import { PromiseProvider } from "mongoose";


const MessageInput = (props) => {
  const [publicMessage, setPublicMessage] = useState("");
  const [publicName, setPublicName] = useState("");
  const [publicEmail, setPublicEmail] = useState("");
  // const [messageCount, setMessageCount] = useState()
  // const PublicMessages = () => {
  //   axios.get("/message/messages")
  //   .then(res => {
  //     const messages = res.data;
  //     setMessageCount(messages)
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }

  // useEffect(() => {
  //   PublicMessages()
  // }, [])


  const clearState = () => {
    setPublicName('');
      setPublicEmail('');
      setPublicMessage('');
}

  const handlePublicMessageInput = (e) => {
    e.preventDefault()
    const value = e.target.value
    console.log(value)
    setPublicMessage(value)
  }

  const handlePublicUserName = (e) => {
    e.preventDefault()
    const value = e.target.value
    const name = e.target.name
    console.log(value, name)
    setPublicName(value)
  }
  const handlePublicUserEmail= (e) => {
    e.preventDefault()
    const value = e.target.value
    const name = e.target.name
    console.log(value, name)
    setPublicEmail(value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.value
    const name = e.target.name
    if (publicName && publicMessage){
    axios.post('/message/messages', {name: publicName, email: publicEmail, message: publicMessage}).then(res => {
      console.log(res);
      console.log(res.data);
      e.target.reset();
      clearState()
      window.location.reload();
    })}
    else {
      console.log("need a name and message")
    }
    
  }

  return(
    <>
    <form onSubmit={handleSubmit}>
      {props.messageCount ? <><br /><p id="messageCount">{props.messageCount} Messages of Gratitude </p> <br /></>: null}
       <textarea name="publicMessage" onChange={handlePublicMessageInput} placeholder="Enter a comment..." onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Enter a comment..."}/>
       <br />
       <br /><p>Comment as a Guest: </p> <br />
       <div><input name="publicName" onChange={handlePublicUserName} placeholder="Name"/> <br />
       <input name="hiddenEmail" onChange={handlePublicUserEmail} placeholder="Email (Not displayed publicly)"/></div> <br />
       <button type="submit" >Post Gratitude</button>
    </form>
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="lightgrey" className="bi bi-arrow-down-circle" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
</svg><br />
  </>
  )
}

export default MessageInput