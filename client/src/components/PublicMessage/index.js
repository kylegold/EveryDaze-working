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
import Modal from 'react-modal'
import CommentInput from "../CommentInput"



const PublicMessage = (props) => {
  console.log(props)

  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    setIsOpen(false);
  }
 

  const handleUpvote = async message => {
    try {
      const {data} = await axios.put(`/message/messages/upvote/${message._id}`);
      console.log('updatd msg==>>', data)
    } catch (err) {
      console.log('err upvoting==>>', err)
    }
    
  }
  
  const handleComment = async message => {
    console.log(message._id, message.comments)
    openModal()
    // try {
    //   const {data} = await axios.put(`/message/messages/comment/${message._id}`);
    //   console.log('updatd msg==>>', data)
    // } catch (err) {
    //   console.log('err upvoting==>>', err)
    // }
    
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
      <button id="commentButton" onClick={() => {handleComment(message)}}>Comment</button>
      <button id="likeButton" className="fa" onClick={() => handleUpvote(message)}>&#xf25b; <span>{message.upvotes}</span></button>
      {/* <button id="upvoteCount">{message.upvotes}</button> */}
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
              <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          // style={customStyles}
          contentLabel="Example Modal"
        >

          <div id="modalHeader">
          <button id="closeModal" onClick={closeModal}>X</button>
          </div>
          <div id="modalBox">
          <h2 id="modalTitle" ref={_subtitle => (subtitle = _subtitle)}>{message.message}</h2>
          < CommentInput />
          </div>
          
         
        </Modal>
    </div>) : null}
    
  </div>
  )
}

export default PublicMessage