import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignupFormPage'; 
// import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditProfile from '../ProfilePage/editProfile';


function FormModal() {
  const [showModal, setShowModal] = useState(false);
  // const sessionUser = useSelector(state =>state.session.user);
  const {userId} = useParams()

  const handleClick = (e)=>{
    e.preventDefault();
    setShowModal(true);
  }

  let modalState;
  let buttonText;
  let buttonId;

  if (!userId){
    modalState = <SignupFormPage/>
    buttonText = 'Create a new account'
    buttonId = 'create-button'
  }else{
    modalState = <EditProfile/>
    buttonText = <span><i class="fa-solid fa-pen-to-square"></i> Edit Profile</span>
    buttonId = 'editProfile'
  }
  
  return (
    <>
    <div className='signupModal'>
      <button id={buttonId} onClick={handleClick}>{buttonText}</button>
      {showModal && (
        <Modal className = 'signup' onClose={() => setShowModal(false)}>
          {modalState}
        </Modal>
      )}
    </div>
    </>
  );
}

export default FormModal;