import React, { useState,createContext } from 'react';
import { Modal } from '../../context/Modal';
import { useParams } from 'react-router-dom';


const ModalContext = createContext()

export {ModalContext}

function PostsModal() {
   const [showModal, setShowModal] = useState(false);
  const {userId} = useParams()

  const handleClick = (e)=>{
    e.preventDefault();
    setShowModal(true);
  }

  
  
  return (
    <>
    <div className='postsModal'>
      <button id={buttonId} onClick={handleClick}>{buttonText}</button>
      {showModal && (
        <Modal className = 'signup' onClose={() => setShowModal(false)}>
          
        </Modal>
      )}
    </div>
    </>
  );
}

export default PostsModal;