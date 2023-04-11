import { useSelector } from "react-redux";
import { getUser } from "../../store/users";
import PostOptions from "./PostOptions";
import { useHistory } from "react-router-dom";



export const PostItem = (props)=>{
    const history = useHistory()
    let profilePhoto;
    let sessionProfilePhoto;
    let postsPhoto
    let optionsDropdown

    let post = props.post
    let user = useSelector(getUser(post.userId))


    if (!user) return null 
    if (!props.sessionUser) return null 
    
    if (user.avatar){
        profilePhoto = <img alt = 'avatar'src = {user.avatar}/>
    }else{
        profilePhoto = <i className="fa-solid fa-user-circle" />
    }

    if (props.sessionUser.avatar){
        sessionProfilePhoto= <img alt = 'avatar'src = {props.sessionUser.avatar}/>
    }else{
        sessionProfilePhoto= <i className="fa-solid fa-user-circle" />
    }
    let displayPhoto;
    if (post.photo){
        postsPhoto = <img id ='postsPhoto' alt = 'avatar'src = {post.photo}/>
        displayPhoto = 'postsPhotoContainer'
    }else{
        <img id ='postsPhoto' alt = 'avatar'src = {props.sessionUser.avatar}/>
        displayPhoto = 'hiddenPhoto'
    }

    if (props.sessionUser.id === user.id){
        optionsDropdown = <PostOptions user = {props.sessionUser} post = {post}/>
    }
    
    const redirectShow = (userId)=>{
        history.push(`/users/${userId}`)
    }

    return(
        <div key = {post.id} className="userPostsContainer">
                    <div id = 'postsContent'>
                        <div>
                            <div onClick={()=>redirectShow(post.userId)} id = 'postIcon'>{profilePhoto}</div>
                        </div>
                        <p onClick={()=>redirectShow(post.userId)}>{user.firstName} {user.lastName}</p>
                    {optionsDropdown}
                    </div>
                    <p id = "postsBody">{post.body}</p>
                    <div id = {displayPhoto}>
                        {postsPhoto}
                    </div>
                    <div id = 'likeComment'>
                        <p><i className="fa-regular fa-thumbs-up"></i> Like</p>
                        <p><i className="fa-regular fa-message"></i> Comment</p>
                        
                    </div>
                    <div id = 'replyContainer'>
                        <div id = 'replyIcon'>{sessionProfilePhoto}</div>
                        <input placeholder ='Write a comment'></input>
                    </div>
                </div>
    )

}

export default PostItem