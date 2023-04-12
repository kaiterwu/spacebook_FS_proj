import React, {useState,createContext} from 'react'
import { Modal } from '../../context/Modal'
import RemoveFriend from '../Friends/removeFriend'

const ModalContext = createContext()

export {ModalContext}

function RemoveFriendModal(props){
    const [showModal, setShowModal] = useState(false);
    const userId = props.userId
    const friendId = props.friendId
    const removeText =  
    <div id = 'unfriendTag'>
        <div>
            <i className ="fa-solid fa-user"></i>
            <i className="fa-solid fa-check"></i>
        </div> 
        <div>Friends</div>
    </div>
    const [text,setText] = useState(removeText)


    const handleClick = (e)=>{
        e.preventDefault();
        setShowModal(true);
      }
    
      return(
        <>
            <button onMouseOver={()=>setText("Unfriend?")} id = "removeFriendModal" onClick={handleClick}
            onMouseLeave={()=>setText(removeText)}>
                <div id = 'unfriendTag'>
                {text}
                </div>
            </button>
            {showModal && (
            <Modal className = 'signup' onClose={() => setShowModal(false)}>
                <section className='trashModalContainer'>
                    <h1>Are you sure?</h1>
                    <div className='trashButtons'>
                        <button id = 'CancelRemove' onClick = {()=>setShowModal(false)}>Cancel</button>
                        <RemoveFriend userId = {userId} friendId = {friendId} setShowModal = {setShowModal}/>
                    </div>
                </section>
            </Modal>
        )}
        </>
      )
}

export default RemoveFriendModal