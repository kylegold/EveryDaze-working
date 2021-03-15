import React from 'react';
import Modal from 'react-modal'
import "./style.css"
import CommentInput from "../CommentInput"


// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };
 
const PopUp = () => {
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
 
    return (
      <div id="modalDesign">
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
          <h2 id="modalTitle" ref={_subtitle => (subtitle = _subtitle)}>Want to be updated with the happening of this exhibition? Sign up to be informed.</h2>
          < CommentInput />
          </div>
          
         
        </Modal>
      </div>
    );
}

export default PopUp