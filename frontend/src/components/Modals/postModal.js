import React, { useState,createContext } from 'react';
import { Modal } from '../../context/Modal';
import './postsModal.css'
import { useSelector } from 'react-redux';
import { getUser } from '../../store/users';
import PostsForm from '../Posts/postsForm';




const ModalContext = createContext()

export {ModalContext}

function PostsModal(props) {
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

  let containerId,icon,buttonId,buttonContainerId,formType
  if (props.type === 'Create'){
    containerId = 'createPost'
    icon = <div id = "postIcon">{avatar}</div>
    buttonContainerId = 'postsModal'
    buttonId = 'postsModalb'
    formType = <PostsForm setShowModal={setShowModal} type = {props.type} user = {props.user}/>
  }


  return (
    <>
    <div id = {containerId}>
        {icon}
        <div className={buttonContainerId}>
        <button id ={buttonId} onClick={handleClick}>What's on your mind, {sessionUser.firstName}?</button>
        {showModal && (
            <Modal className = 'signup' onClose={() => setShowModal(false)}>
              {formType}
            </Modal>
        )}
        </div>
    </div>
    </>
  );
}

export default PostsModal;