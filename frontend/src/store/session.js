import csrfFetch from "./csrf";


const RECEIVE_USER = 'session/receiveUser'
const REMOVE_USER = 'session/removeUser'

//action creator
export const receiveUser = user => ({
    type: RECEIVE_USER,
    payload:user
});

export const removeUser = () => ({
    type: REMOVE_USER,
    
});



const storeCSRFToken = response =>{
    const csrfToken = response.headers.get("X-CSRF-Token")
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token",csrfToken);
}

const storeCurrentUser = user =>{
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user))
    else{sessionStorage.removeItem("currentUser")}
}

//thunk action creator
export const restoreSession = ()=> async dispatch =>{
    const res = await csrfFetch('api/session')
    storeCSRFToken(res)
    const data = await res.json()
    storeCurrentUser(data.user)
    dispatch(receiveUser(data.user))
    return res 

}
export const login = user => async dispatch => {
    const {email,password} = user;
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await res.json();
    // sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    storeCurrentUser(data.user)
    dispatch(receiveUser(data.user));
    return res
}

// export const fetchUser = userId => async(dispatch)=>{
//     const res = await csrfFetch (`api/users/${userId}`)
//     const user = await res.json()
//         dispatch(receiveUser(user))
//         return res 
// }

export const signup = user => async dispatch =>{
    const {firstName,lastName,email,password,gender,birthday} = user;
    // debugger
    const res = await csrfFetch('/api/users',{
        method: 'POST',
        body: JSON.stringify({
        user:{
            
            firstName,
            lastName,
            email,
            password,
            gender,
            birthday
        }
        })
    });
    
    let data = await res.json()
    storeCurrentUser(data.user)
    dispatch(receiveUser(data.user))
    return res
}




export const logout = () => async dispatch =>{
    const res = await csrfFetch('api/session',{
        method: 'DELETE'
    })

    storeCurrentUser(null);
    dispatch(removeUser());
    return res 
}

const initialState = {
    user: JSON.parse(sessionStorage.getItem("currentUser"))
}
const sessionReducer = (state= initialState, action) => {
    // const nextState = { ...state };

    switch(action.type) {
        case RECEIVE_USER:
            // nextState[action.user] = action.payload;
            // return nextState;
            return {...state,user:action.payload}
        case REMOVE_USER:
           return {...state, user:null}
        default:
            return state;
    }
}

export default sessionReducer;


/*
a = {title: 'hello',description:'hi',price:20,seating:5,lat:10,lng:20}
*/