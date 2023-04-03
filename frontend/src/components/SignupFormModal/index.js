import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignupFormPage'; 
import './SignupModal.css'


function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e)=>{
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <>
    <div className='signupModal'>
      <button id="create-button" onClick={handleClick}>Create a new account</button>
      {showModal && (
        <Modal className = 'signup' onClose={() => setShowModal(false)}>
          <SignupFormPage/>
        </Modal>
      )}
    </div>
    </>
  );
}

export default SignupFormModal;