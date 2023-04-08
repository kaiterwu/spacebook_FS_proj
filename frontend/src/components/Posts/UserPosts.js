import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { fetchUserPosts,getPosts } from "../../store/posts"
import { getUser } from "../../store/users"
import './posts.css'



const UserPosts = (props)=>{
    const dispatch = useDispatch()
    const posts = useSelector(getPosts)
    const userId = props.user.id

    const userPosts = Object.values(posts)
    const sessionUser = useSelector(state =>state.session.user);
    const sessionUserId = sessionUser.id
    const loggedInUser = useSelector(getUser(sessionUserId))
    

    useEffect(()=>{
        dispatch(fetchUserPosts(userId))
    },[dispatch,userId])
    let profilePhoto;
    
    if (props.user.avatar){
        profilePhoto = <img alt = 'avatar'src = {props.user.avatar}/>
    }else{
        profilePhoto = <i className="fa-solid fa-user-circle" />
    }

    return(
        <>
            {userPosts.map(post=>
                <div className="userPostsContainer">
                    <div id = 'postsContent'>
                        <div>
                            <div id = 'postIcon'>{profilePhoto}</div>
                        </div>
                        <p>{props.user.firstName} {props.user.lastName}</p>
                    </div>
                    <p id = "postsBody">{post.body}</p>
                    <div id = 'likeComment'>
                        <p><i className="fa-regular fa-thumbs-up"></i> Like</p>
                        <p><i className="fa-regular fa-message"></i> Comment</p>
                        
                    </div>
                    <div id = 'replyContainer'>
                        <div id = 'replyIcon'><img alt = 'avatar'src = {loggedInUser.avatar}/></div>
                        <input placeholder ='Write a comment'></input>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserPosts