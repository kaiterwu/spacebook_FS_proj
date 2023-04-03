import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignupFormPage'; 


function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e)=>{
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <>
      <button id="create-button" onClick={handleClick}>Create a new account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage/>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;