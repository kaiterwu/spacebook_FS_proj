import React, { useState,createContext } from 'react';
import { Modal } from '../../context/Modal';
// import { useParams } from 'react-router-dom';
import './postsModal.css'
import { useSelector } from 'react-redux';
import { getUser } from '../../store/users';


const ModalContext = createContext()

export {ModalContext}

function PostsModal() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state =>state.session.user);
    const user = useSelector(getUser(sessionUser.id))
    const handleClick = (e)=>{
    e.preventDefault();
    setShowModal(true);
  }
  let avatar;
  if(sessionUser.avatar){
    avatar = <img alt = 'avatar' src = {user.avatar}/>
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
                <h1>Put posts content here</h1>
            </Modal>
        )}
        </div>
    </div>
    </>
  );
}

export default PostsModal;