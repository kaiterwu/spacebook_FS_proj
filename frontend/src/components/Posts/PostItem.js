import { useSelector } from "react-redux";
import { getUser } from "../../store/users";
import { useHistory } from "react-router-dom";
import { getPostLikes } from "../../store/likes";
import PostComments from "../Comments/PostComments";
import PostOptions from "./PostOptions";



export const PostItem = (props)=>{
    const history = useHistory()
    let profilePhoto;
    let postsPhoto
    let optionsDropdown

    let post = props.post
    const sessionUser = useSelector(state =>state.session.user);
    let user = useSelector(getUser(post.userId))
    let postLikes = useSelector(getPostLikes(post.id))
    let likesCounter;

    if (postLikes.length){
        likesCounter = <div id = "likescounterContainer">
        <i className="fa-solid fa-thumbs-up"></i> {postLikes.length} 
        </div>
    }

    const likesBool = postLikes.some((like) => like.userId === sessionUser.id )
    const userLike = postLikes.find((like) => like.userId === sessionUser.id)



    if (!user) return null 
    if (!props.sessionUser) return null 
    
    if (user.avatar){
        profilePhoto = <img alt = 'avatar'src = {user.avatar}/>
    }else{
        profilePhoto = <i className="fa-solid fa-user-circle" />
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
                        <div id = "likesContainer">
                            {likesCounter}
                        </div>
                   <PostComments post = {post} sessionUser ={props.sessionUser} likesBool = {likesBool}
                    userLike = {userLike}
                   />
                </div>
    )

}

export default PostItem