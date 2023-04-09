import React, {useState,createContext} from 'react'
import { Modal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../store/posts'

const ModalContext = createContext()

export {ModalContext}

function RemovePostModal(props){
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    const post = props.post

    const handleClick = (e)=>{
        e.preventDefault();
        setShowModal(true);
      }
    
      const handleRemoveClick = (e)=>{
        e.preventDefault();
        dispatch(deletePost(post.id)).then(()=>{setShowModal(false)})
      }

      return(
        <>
            <button id = "trashButton" onClick={handleClick}>
                <div>
                    <i className="fa-solid fa-trash-can"></i> Move to trash
                </div>
            </button>
            {showModal && (
            <Modal className = 'signup' onClose={() => setShowModal(false)}>
                <section className='trashModalContainer'>
                    <h1>Move to your Trash?</h1>
                    <div className='trashButtons'>
                        <button id = 'CancelRemove' onClick = {()=>setShowModal(false)}>Cancel</button>
                        <button onClick={handleRemoveClick}>Move</button>
                    </div>
                </section>
            </Modal>
        )}
        </>
      )
}

export default RemovePostModal