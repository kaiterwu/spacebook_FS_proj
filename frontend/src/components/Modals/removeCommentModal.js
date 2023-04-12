import React, {useState,createContext} from 'react'
import { Modal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { deleteComment } from '../../store/comments'

const ModalContext = createContext()

export {ModalContext}

function RemoveCommentModal(props){
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    const comment = props.comment

    const handleClick = (e)=>{
        e.preventDefault();
        setShowModal(true);
      }

      const handleRemoveClick = (e)=>{
        e.preventDefault();
        dispatch(deleteComment(comment.id)).then(()=>{setShowModal(false)})
      }

    return(
        <>
            <button id = 'deleteCommentButton' onClick = {handleClick}>
            <i className="fa-solid fa-eraser"></i> Delete comment
            </button>
            {showModal && (
            <Modal className = '' onClose={() => setShowModal(false)}>
                <section className='trashModalContainer'>
                    <h1>Delete Comment?</h1>
                    <div className='trashButtons'>
                        <button id = 'CancelRemove' onClick = {()=>setShowModal(false)}>Cancel</button>
                        <button onClick={handleRemoveClick}>Delete</button>
                    </div>
                </section>
            </Modal>
        )}

        </>
    )

}

export default RemoveCommentModal
