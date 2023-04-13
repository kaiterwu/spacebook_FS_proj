import csrfFetch from "./csrf";

export const RECEIVE_LIKES = 'likes/RECEIVE_likes'
export const RECEIVE_LIKE = 'likes/RECEIVE_like'
export const REMOVE_LIKE = 'likes/REMOVE_like'

const receiveLikes = likes =>({
    type:RECEIVE_LIKES,
    likes
})

const receiveLike = like =>({
    type: RECEIVE_LIKE,
    like 
})

const removeLike = likeId =>({
    type: REMOVE_LIKE,
    likeId
})

export const getLikes = state =>{
    if (state.likes){
        return Object.values(state.likes)
    }else{
        return []
    }
}

export const getPostLikes = postId => state =>{
    const postLikesArr = Object.values(state.likes)
    .filter(like=> (like.likeableId === postId && like.likeableType === 'Post'))
    return postLikesArr 
}

export const getCommentLikes = commentId =>state=>{
    const postLikesArr = Object.values(state.likes)
    .filter(like=> (like.likeableId === commentId && like.likeableType === 'Comment'))
    return postLikesArr 
}

export const fetchLikes = ()=>async(dispatch)=>{
    const response = await csrfFetch('/api/likes')
    if(response.ok){
        const likes = await response.json()
        dispatch(receiveLikes(likes))
    }
}

export const fetchLike = likeId => async(dispatch)=>{
    const response = await csrfFetch(`/api/likes/${likeId}`)
    if(response.ok){
        const like = await response.json()
        dispatch(receiveLike(like))
    }
}

export const createLike = like =>async(dispatch)=>{
    const {userId,likeableId,likeableType} = like 
    const response = await csrfFetch(`/api/likes`,{
        method: 'POST',
        body: JSON.stringify({
            like:{
                userId,
                likeableId,
                likeableType
            }
        })
    })
    if(response.ok){
        const like = await response.json()
        dispatch(receiveLike(like))
        return like 
    }
}


export const deleteLike = likeId => async(dispatch)=>{
    const response = await csrfFetch(`/api/likes/${likeId}`,{
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(removeLike(likeId))
    }
}

const likesReducer = (state={},action)=>{
    switch(action.type){
        case RECEIVE_LIKES:
            return{...action.likes}
        case RECEIVE_LIKE:
            return{...state,[action.like.id]:action.like}
        case REMOVE_LIKE:
            const newState = {...state}
            delete newState[action.likeId]
            return newState 
        default:
            return state 
    }
}

export default likesReducer
