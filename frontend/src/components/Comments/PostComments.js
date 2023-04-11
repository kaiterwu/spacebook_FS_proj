import { getPostComments } from "../../store/comments"
import { useSelector } from "react-redux"
import CommentItem from "./commentItem"

const PostComments = (props)=>{
    const comments = useSelector(getPostComments(props.post.id))
    let sessionProfilePhoto;
    const sessionUser = props.sessionUser 

    if (sessionUser.avatar){
        sessionProfilePhoto= <img alt = 'avatar'src = {sessionUser.avatar}/>
    }else{
        sessionProfilePhoto= <i className="fa-solid fa-user-circle" />
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
            <div id = 'replyContainer'>
                <div id = 'replyIcon'>{sessionProfilePhoto}</div>
                <input placeholder ='Write a comment'></input>
            </div>

        </>
    )

}

export default PostComments