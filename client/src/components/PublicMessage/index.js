import React, {useState, useEffect} from "react"
import "./style.css"
import axios from "axios"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";


const PublicMessage = (props) => {
  console.log(props)

  const handleUpvote = async message => {
    try {
      const {data} = await axios.put(`/message/messages/upvote/${message._id}`);
      console.log('updatd msg==>>', data)
    } catch (err) {
      console.log('err upvoting==>>', err)
    }
    
  }
  
  return (
    
    <div id="publicMessages">
     
    {props.messageState ? props.messageState.map((message, i) => <div key={i} id="messageBox">
    <div id="messageInfo">
    <h3>{message.name}</h3>
    <h5>{message.created_At}</h5>
    {/* <FacebookIcon size={32} round={true} /> */}
    </div>
    <p id="messageContent">{message.message}</p>
    <br />
    <br />
    <br />
    <div id="userReaction">
      <button id="commentButton" onClick={() => {console.log(message._id, message.comments)}}>Comment</button>
      <button id="likeButton" onClick={() => handleUpvote(message)}>Like</button>
    </div>
    <div id="facebookShare">
    <WhatsappShareButton
     url={"https://www.whatdazeit.com"}
     title={message.message}
     separator=" - "
   >
     <WhatsappIcon size={20} round={true}/>
   </WhatsappShareButton>
    <TwitterShareButton
     url={"https://www.whatdazeit.com"}
     title={message.message}
     hashtag="#theeverydaze"
   >
     <TwitterIcon size={20} round={true}/>
   </TwitterShareButton>
    <FacebookShareButton 
                url={"https://www.whatdazeit.com"}
                quote={message.message}
                hashtag="#theeverydaze">
                 <FacebookIcon size={20} round={true}/>
              </FacebookShareButton></div>
    </div>) : null}
    
  </div>
  )
}

export default PublicMessage