import { getPostComments } from "../../store/comments"
import { useSelector } from "react-redux"
import CommentItem from "./commentItem"
import { useState } from "react"
import { createComment} from "../../store/comments"
import { useDispatch } from "react-redux"


const PostComments = (props)=>{
    const comments = useSelector(getPostComments(props.post.id))
    const dispatch = useDispatch()
    let sessionProfilePhoto;
    const sessionUser = props.sessionUser 
    let comment;

    if (sessionUser.avatar){
        sessionProfilePhoto= <img alt = 'avatar'src = {sessionUser.avatar}/>
    }else{
        sessionProfilePhoto= <i className="fa-solid fa-user-circle" />
    }

    const [newComment,setNewComment] = useState('')

    const handleChange = (e)=>{
        setNewComment(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        comment = {
            body:newComment,
            userId: sessionUser.id,
            postId: props.post.id
        }
        dispatch(createComment(comment))
        setNewComment('')
    }

    const enterKey = (e)=>{
        if (e.key === 'Enter'){
            handleSubmit(e)
        }else if (e.key === 'Escape'){
            setNewComment('')
        }
    }

    return(
        <>
         <div id = 'likeComment'>
            <p><i className="fa-regular fa-thumbs-up"></i> Like</p>
            <p><i className="fa-regular fa-message"></i> Comment</p>
                        
            </div>
            <div id ="CommentsContainer"> 
                {comments.map(comment=><CommentItem
                    key = {comment.id}
                    comment = {comment}
                />)}
            </div>
                <form onSubmit = {handleSubmit} id = 'replyContainer'>
                    <div id = 'replyIcon'>{sessionProfilePhoto}</div>
                    <input placeholder ='Write a comment' value ={newComment} 
                    onChange={handleChange} onKeyDown={enterKey}/>
                </form>

        </>
    )

}

export default PostComments