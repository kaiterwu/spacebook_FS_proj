import React, { useState,createContext } from 'react';
import { Modal } from '../../context/Modal';
import './postsModal.css'
import { useSelector } from 'react-redux';
import { getUser } from '../../store/users';




const ModalContext = createContext()

export {ModalContext}

function PostsModal() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state =>state.session.user);
    const userId = sessionUser.id
    const user = useSelector(getUser(userId))

    const handleClick = (e)=>{
      e.preventDefault();
      setShowModal(true);
    }

  let avatar;
  if(sessionUser.avatar){
    avatar = <img alt = 'avatar' src = {user?.avatar}/>
  }else{
    avatar = <i className="fa-solid fa-user-circle" />
  }

  return (
    <>
    <div id = 'createPost'>
        <div id = "postIcon">{avatar}</div>
        <div className='postsModal'>
        <button id ="postsModalb" onClick={handleClick}>What's on your mind, {sessionUser.firstName}?</button>
        {showModal && (
            <Modal className = 'signup' onClose={() => setShowModal(false)}>
            
            </Modal>
        )}
        </div>
    </div>
    </>
  );
}

export default PostsModal;