import React, {useState} from "react"
import axios from "axios";
import "./style.css"
import { PromiseProvider } from "mongoose";


const CommentInput = ({closeModal}) => {
  const [publicComment, setPublicComment] = useState("");
  // console.log("message ID: ", message._id, "comments: ", message.comments, "message: ",message.message, "upvotes: ", message.upvotes)
  const messageString = localStorage.getItem('messageObject');
  const messageObject = JSON.parse(messageString)

  const clearState = () => {

      setPublicComment('');
}

  const handlePublicCommentInput = (e) => {
    e.preventDefault()
    const value = e.target.value
    const name = e.target.name
    console.log(value, name)
    setPublicComment(value)
  }

  const handleComment = async () => {
    try {
          const {data} = await axios.put(`/message/messages/comment/${messageObject.message_id}`, {msg: publicComment});
          console.log('updatd msg==>>', data)
        
    } catch (err) {
      console.log('err upvoting==>>', err)
    }
    
  // }
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (publicComment){
  //   axios.put(`/message/messages/comment/${messageObject.message_id}`, publicComment).then(res => {
  //     e.target.reset();
  //     clearState()
  //     window.location.reload();
  //   })}
  //   else {
  //     console.log("need comment")
  //   }
  }

  return(
    <>
    <form id="commentForm" onSubmit={()=>{handleComment()}}>
    <div id="modalHeader">
          <button id="closeModal" onClick={closeModal}>X</button>
        
          </div>
    {/* <h2 id="modalTitle">{messageObject.message_content}</h2> */}
       <div id="inputDiv">
       <textarea id="publicComment" name="publicComment" onChange={handlePublicCommentInput} placeholder="Ask a question or leave a comment..." onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Enter a comment..."}/>
       </div> 
       <br />
       <div id="submitQuestion"><button className="questionButton" type="submit" >Submit</button></div>
    </form>
    {messageObject.message_comments ? messageObject.message_comments.map((comment, i) =>  <div key={i} id="commentBox">
  <p id="commentContent">{comment.msg}</p>
     </div>
    ) : null}
  
  </>
  )
}

export default CommentInput