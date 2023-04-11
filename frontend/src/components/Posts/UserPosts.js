import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { fetchUserPosts,getPosts } from "../../store/posts"
import { fetchComments } from "../../store/comments"
import PostItem from "./PostItem"
import './posts.css'



const UserPosts = (props)=>{
    const dispatch = useDispatch()
    const posts = useSelector(getPosts)
    const userId = props.user.id

    const userPosts = Object.values(posts).reverse()
    

    useEffect(()=>{
        dispatch(fetchUserPosts(userId))
        dispatch(fetchComments())
    },[dispatch,userId])

    return(
        <>
            {userPosts.map(post=><PostItem
                post = {post}
               user = {props.user}
               sessionUser = {props.sessionUser}
               key = {post.id}

            />
            )}
        </>
    )
}

export default UserPosts