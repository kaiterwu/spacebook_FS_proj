import csrfFetch from './csrf'

const RECEIVE_FRIENDS = 'friends/receiveFriends'

export const receiveFriends = friends =>({
    type: RECEIVE_FRIENDS,
    friends
})

export const getFriends = (state) =>{
    if (state.friends){
        return Object.values(state.friends)
    }else{
        return []
    }
}

export const fetchFriends = (userId) => async(dispatch) =>{
    const res = await csrfFetch(`/api/user-friends/${userId}`)
    const friends = await res.json()
    dispatch(receiveFriends(friends))
    return res 
}

const friendsReducer = (state = {},action)=>{
    switch(action.type){
        case RECEIVE_FRIENDS:
            return {...action.friends}
        default:
            return state 
    }
}

export default friendsReducer 