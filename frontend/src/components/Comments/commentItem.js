import { useSelector } from "react-redux"
import { getUser } from "../../store/users"
import CommentOptions from "./commentOptions"
import './comments.css'
import { useState } from "react"
import { updateComment } from "../../store/comments"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getCommentLikes,deleteLike,createLike } from "../../store/likes"


const CommentItem = (props)=>{
    let comment = props.comment
    const user = useSelector(getUser(comment.userId))
    const sessionUser = useSelector(state =>state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const commentLikes = useSelector(getCommentLikes(comment?.id))
    let likesCounter;

    if(commentLikes.length){
        likesCounter = <div id = "commentlikesContainer">
        <i className="fa-solid fa-thumbs-up"></i> {commentLikes.length} 
        </div>
    }

    const likesBool = commentLikes.some((like) => like.userId === sessionUser.id )
    const userLike = commentLikes.find((like) => like.userId === sessionUser.id)

    const handleUnlikeClick = ()=>{
        dispatch(deleteLike(userLike.id))
    }

    const handleLikeClick = ()=>{
        let like = {
            userId: sessionUser.id,
            likeableId: comment.id,
            likeableType: 'Comment'
        }
        dispatch(createLike(like))
    }
    
    let likesButton
    if (likesBool){
        likesButton = <p onClick={handleUnlikeClick} id ="commentsunlike" >Like</p>
    }else{
        likesButton = <p onClick={handleLikeClick} id ="commentslike"> Like</p>
    }


    let bubbleDisplay;
    let formDisplay;
    let avatarPhoto;
    let commentOptions;

    const [newComment,setNewComment] = useState(comment.body)
    const [display,setDisplay] = useState(false)

    if (!display){
        bubbleDisplay = 'commentBubbleContainer'
        formDisplay = 'hideCommentForm'
    }else{
        bubbleDisplay = 'hideBubbleContainer'
        formDisplay = 'showCommentForm'
    }

    const handleChange = (e)=>{
        setNewComment(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        comment = {
            id: comment.id,
            body:newComment,
            userId: sessionUser.id,
            postId: comment.postId
        }
        dispatch(updateComment(comment))
        setDisplay(false)
    }

    const enterKey = (e)=>{
        if (e.key === 'Enter'){
            handleSubmit(e)
        }else if (e.key === 'Escape'){
            setDisplay(false)
            setNewComment(comment.body)
        }
    }

    useEffect(()=>{
        setDisplay(false)
        setNewComment(comment.body)
    },[comment.body])

    if (user.id === sessionUser.id){
        commentOptions = <CommentOptions comment = {comment} setDisplay = {setDisplay}/>}
    if (user.avatar){
        avatarPhoto= <img alt = 'avatar'src = {user.avatar}/>
    }else{
        avatarPhoto= <i className="fa-solid fa-user-circle" />
    }

    return(
        <>
            <div id = 'commentsContainer'>
                <div id = 'commentIcon' onClick={()=>{history.push(`/users/${user?.id}`)}}>{avatarPhoto}</div>
                    <div id ={bubbleDisplay}>
                        <div id = 'commentBubble'>
                            <h1 onClick={()=>{history.push(`/users/${user?.id}`)}}>{user.firstName} {user.lastName}</h1>
                            <p>{comment.body}{likesCounter}</p>
                            
                        </div>
                    {likesButton}
                     </div>
                        <form id = {formDisplay}>
                            <input onKeyDown={enterKey} onChange={handleChange}
                            id ="editCommentInput" value = {newComment} placeholder ='Write a comment'/>
                            <p>Press ESC to cancel</p>
                        </form>
                    {commentOptions}
            </div>
        </>
    )
}

export default CommentItem