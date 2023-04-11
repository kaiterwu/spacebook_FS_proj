import { useSelector } from "react-redux"
import { getUser } from "../../store/users"
import './comments.css'

const CommentItem = (props)=>{
    const comment = props.comment
    const user = useSelector(getUser(comment.userId))

    let avatarPhoto;
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
                    <p id = 'commentslike'>Like</p>
                </div>
            
            </div>
        </>
    )
}

export default CommentItem