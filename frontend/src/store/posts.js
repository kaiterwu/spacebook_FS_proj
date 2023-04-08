import csrfFetch from "./csrf";
// import { useDispatch } from "react-redux";

export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS'
export const RECEIVE_POST = 'posts/RECEIVE_POST'
export const REMOVE_POST = 'posts/REMOVE_POST'

// const dispatch = useDispatch()


const receivePosts = posts =>({
    type:RECEIVE_POSTS,
    posts
})

const receivePost = post =>({
    type:RECEIVE_POST,
    post
})

const removePost = postId =>({
    type:REMOVE_POST,
    postId
})

export const getPosts = state =>{
    if (state.posts){
        return Object.values(state.posts)
    }else{
        return []
    }
}

export const getPost = postId => state =>{
    if (state.posts){
        return state.posts[postId]
    }else{
        return null
    }
}

export const fetchPosts = ()=>async(dispatch)=>{
    const response = await csrfFetch('/api/posts')
    if(response.ok){
        const posts = await response.json()
        dispatch(receivePosts(posts))
    }
}

export const fetchUserPosts = (userId)=>async(dispatch)=>{
    const response  = await csrfFetch(`/api/user-posts/${userId}`)
    if(response.ok){
        const posts = await response.json()
        dispatch(receivePosts(posts))
    }
}

export const fetchPost = postId =>async(dispatch)=>{
    const response = await csrfFetch(`/api/posts/${postId}`)
    if(response.ok){
        const post = await response.json()
        dispatch(receivePost(post))
    }
}

export const createPost = post =>async(dispatch)=>{
    const response = await csrfFetch(`/api/posts`,{
        method: 'POST',
        body: JSON.stringify(post)
    })
    if(response.ok){
        const post = await response.json()
        dispatch(receivePost(post))
    }
}

export const updatePost = post =>async(dispatch)=>{
    const response = await csrfFetch(`/api/posts/${post.id}`,{
        method: 'PATCH',
        body: JSON.stringify(post)
    })
    if(response.ok){
        const post = await response.json()
        dispatch(receivePost(post))
    }
}

export const deletePost = postId =>async(dispatch)=>{
    const response = await csrfFetch(`/api/posts/${postId}`,{
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(removePost(postId))
    }
}

const postsReducer = (state={},action) =>{
    switch(action.type){
        case RECEIVE_POSTS:
            return {...action.posts}
        case RECEIVE_POST:
            return {...state,[action.post.id]:action.post}
        case REMOVE_POST:
            const newState = {...state}
            delete newState[action.postId]
            return newState 
        default:
            return state 
    }
}

export default postsReducer
