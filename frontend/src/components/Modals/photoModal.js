import React, { useState,createContext } from 'react';
import { Modal } from '../../context/Modal';
import './postsModal.css'
import PhotoForm from '../ProfilePage/photoForm';



const ModalContext = createContext()

export {ModalContext}

function PhotoModal(props) {
    const [showModal, setShowModal] = useState(false);
    const handleClick = (e)=>{
    e.preventDefault();
    setShowModal(true);
}
    let buttonText;
    let modalClass;
    let editPhoto;
    if (props.text === 'Profile'){
        buttonText = <i class="fa-solid fa-camera"></i>
        modalClass = 'profilephotoModal'
        
    }else{
        buttonText = <div><i class="fa-solid fa-camera"></i> Edit Cover Photo</div>
        modalClass = 'coverPhotoModal'
       
    }
  
  return (
    <>
    <div id = ''>
        <div className={modalClass}>
        <button onClick={handleClick}>{buttonText}</button>
        {showModal && (
            <Modal className = 'signup' onClose={() => setShowModal(false)}>
                <PhotoForm text = {props.text}/>
            </Modal>
        )}
        </div>
    </div>
    </>
  );
}

export default PhotoModal;