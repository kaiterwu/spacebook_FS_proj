import { useSelector } from "react-redux"
import { getUser } from "../../store/users"
import CommentOptions from "./commentOptions"
import './comments.css'

const CommentItem = (props)=>{
    const comment = props.comment
    const user = useSelector(getUser(comment.userId))
    const sessionUser = useSelector(state =>state.session.user);

    let avatarPhoto;
    let commentOptions;
    if (user.id === sessionUser.id){
        commentOptions = <CommentOptions/>}
    if (user.avatar){
        avatarPhoto= <img alt = 'avatar'src = {user.avatar}/>
    }else{
        avatarPhoto= <i className="fa-solid fa-user-circle" />
    }

    return(
        <>
            <div id = 'commentsContainer'>
                <div id = 'commentIcon'>{avatarPhoto}</div>
                    <div>
                        <div id = 'commentBubble'>
                            <h1>{user.firstName} {user.lastName}</h1>
                            <p>{comment.body}</p>
                        </div>
                         {/* <label ><input id = "editCommentInput"/></label> */}
                    <p id = 'commentslike'>Like</p>
                     </div>
                    {commentOptions}
            </div>
        </>
    )
}

export default CommentItem