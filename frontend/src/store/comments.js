import csrfFetch from "./csrf";

export const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT'
export const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'


const receieveComments = comments =>({
    type:RECEIVE_COMMENTS,
    comments
})

const receiveComment = comment =>({
    type: RECEIVE_COMMENT,
    comment
})

const removeComment = commentId =>({
    type: REMOVE_COMMENT,
    commentId 
})

export const getComments = state =>{
    if (state.comments){
        return Object.values(state.comments)
    }else{
        return []
    }
}

export const getPostComments = postId => state =>{
    const commentArr = state.posts[postId].comments
    if (commentArr.length){
        return commentArr.map(id =>state.comments[id])
    }else{
        return []
    }
}

export const getComment = commentId => state =>{
    if (state.comments){
        return state.comments[commentId]
    }else{
        return null 
    }
}

export const fetchComments = ()=>async(dispatch)=>{
    const response = await csrfFetch('/api/comments')
    if(response.ok){
        const comments = await response.json()
        dispatch(receieveComments(comments))
    }
}

export const fetchPostComments = (postId)=>async(dispatch)=>{
    const response = await csrfFetch(`/api/post-comments/${postId}`)
    if(response.ok){
        const comments = await response.json()
        dispatch(receieveComments(comments))
    }
}

export const fetchComment = commentId => async(dispatch)=>{
    const response = await csrfFetch(`/api/comments/${commentId}`)
    if(response.ok){
        const comment = await response.json()
        dispatch(receiveComment(comment))
    }
}

export const createComment = comment =>async(dispatch)=>{
    const {body,userId,postId} = comment 
    const response = await csrfFetch(`/api/comments`,{
        method: 'POST',
        body: JSON.stringify({
            comment:{
                body,
                userId,
                postId
            }
        })
    })
    if(response.ok){
        const comment = await response.json()
        dispatch(receiveComment(comment))
        return comment 
    }
}

export const updateComment = comment =>async(dispatch)=>{
    const {body,userId,postId} = comment 
    const response = await csrfFetch(`/api/comments`,{
        method: 'PATCH',
        body: JSON.stringify({
            comment:{
                body,
                userId,
                postId
            }
        })
    })
    if(response.ok){
        const comment = await response.json()
        dispatch(receiveComment(comment))
        return comment 
    }
}

export const deleteComment = commentId => async(dispatch)=>{
    const response = await csrfFetch(`/api/comments/${commentId}`,{
        method: 'DELETE',
    })
    if(response.ok){
        dispatch(removeComment(commentId))
    }
}

const commentsReducer = (state={},action)=>{
    switch(action.type){
        case RECEIVE_COMMENTS:
            return{...action.comments}
        case RECEIVE_COMMENT:
            return{...state,[action.comment.id]:action.comment}
        case REMOVE_COMMENT:
            const newState = {...state}
            delete newState[action.commentId]
            return newState
        default:
            return state 
    }
}

export default commentsReducer
