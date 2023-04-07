import React, { useState,createContext } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../FormPage'; 
import { useParams } from 'react-router-dom';


const ModalContext = createContext()

export {ModalContext}

function FormModal() {
   const [showModal, setShowModal] = useState(false);
  const {userId} = useParams()

  const handleClick = (e)=>{
    e.preventDefault();
    setShowModal(true);
  }

  let buttonText;
  let buttonId;

  if (!userId){
    buttonText = 'Create new account'
    buttonId = 'create-button'
  }else{
    buttonText = <span><i className="fa-solid fa-pen-to-square"></i> Edit Profile</span>
    buttonId = 'editProfile'
  }
  
  return (
    <>
    <div className='signupModal'>
      <button id={buttonId} onClick={handleClick}>{buttonText}</button>
      {showModal && (
        <Modal className = 'signup' onClose={() => setShowModal(false)}>
          <SignupFormPage setShowModal = {setShowModal} />
        </Modal>
      )}
    </div>
    </>
  );
}

export default FormModal;