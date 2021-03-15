import React, {useState} from "react"
import axios from "axios";
import "./style.css"
import { PromiseProvider } from "mongoose";


const CommentInput = (props) => {
  const [publicComment, setPublicComment] = useState("");
  
  
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

      setPublicComment('');
}

  const handlePublicCommentInput= (e) => {
    e.preventDefault()
    const value = e.target.value
    const name = e.target.name
    console.log(value, name)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (publicComment){
    axios.put('/message/messages/comment', {comments: publicComment}).then(res => {
      e.target.reset();
      clearState()
      window.location.reload();
    })}
    else {
      console.log("need comment")
    }
    
  }

  return(
    <>
    <form onSubmit={handleSubmit}>
       
       <div id="inputDiv">
       <textarea name="publicComment" onChange={handlePublicCommentInput} placeholder="Ask a question or leave a comment..." onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Enter a comment..."}/>
       </div> 
       <br />
       <div id="submitQuestion"><button className="questionButton" type="submit" >Submit</button></div>
    </form>
  </>
  )
}

export default CommentInput