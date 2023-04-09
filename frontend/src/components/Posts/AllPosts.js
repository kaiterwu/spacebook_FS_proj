import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import {  fetchPosts,getPosts } from "../../store/posts"
import { getUser } from "../../store/users"
import PostItem from "./PostItem"
import './posts.css'
import {fetchUser} from "../../store/users"



const AllPosts = ()=>{
    const dispatch = useDispatch()
    const posts = useSelector(getPosts)
    const allPosts = Object.values(posts).reverse()
    const sessionUser = useSelector(state =>state.session.user);
    const loggedInUser = useSelector(getUser(sessionUser.id))
    
    

    useEffect(()=>{
        dispatch(fetchPosts())
        dispatch(fetchUser(sessionUser.id))
    },[dispatch,sessionUser.id])

    

    return(
        <>
            {allPosts.map(post=><PostItem
                post = {post}
               user = {getUser(post.userId)}
               sessionUser = {loggedInUser}
               key = {post.id}

            />
            )}
        </>
    )
}

export default AllPosts