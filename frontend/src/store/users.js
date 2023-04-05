import csrfFetch from './csrf'
import { storeCurrentUser,receiveUser, restoreSession } from './session'

const RECEIVE_USER = 'users/receiveProfile'
const RECEIVE_USERS = 'users/receieveUsers'

export const receiveProfile = user =>({
    type: RECEIVE_USER,
    user
})

export const receiveUsers = users =>({
    type: RECEIVE_USERS,
    users
})


export const getUser = userId => state =>{
    // debugger
    if (state.users){
        return state.users[userId]
    }else{
        return null
    }
}

//thunk action creator 

export const fetchUser = userId => async(dispatch)=>{
    const res = await csrfFetch (`/api/users/${userId}`)
    const data = await res.json()
    // debugger
        dispatch(receiveProfile(data.user))
        return res 
        // debugger 
}

export  const fetchUsers = () => async(dispatch)=>{
    const res = await csrfFetch ('/api/users')
    const users = await res.json()
    dispatch(receiveUsers(users))
    return res
}

export const editUser = user => async dispatch =>{
    
    const {firstName,lastName,email,password,gender,birthday,aboutMe} = user;
    const res = await csrfFetch(`/api/users/${user.id}`,{
        method: 'PATCH',
        body: JSON.stringify({
            user:{
            
                firstName,
                lastName,
                email,
                password,
                gender,
                birthday,
                aboutMe
            }
        })
        
    });
    let userData = await res.json()
    // debugger
    // storeCurrentUser(data.user)
    dispatch(receiveProfile(userData.user))
    storeCurrentUser(userData.user)
    dispatch(receiveUser)(userData.user)
    restoreSession()
    return res
}

const usersReducer = (state={},action)=>{
    switch(action.type){
        case RECEIVE_USER:
            return {...state,[action.user.id]:action.user}
        case RECEIVE_USERS:
            return{...action.users}
        default:
            return state 
    }
}

export default usersReducer 
