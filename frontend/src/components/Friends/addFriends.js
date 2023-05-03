import csrfFetch from "../../store/csrf"
import { useDispatch } from "react-redux"
import { pushFriendId } from "../../store/users"
const AddFriend = (props)=>{
    const userId = props.userId
    const friendId = props.friendId
    const dispatch = useDispatch()
 
    const makeFriend = (userId,friendId) => async() =>{
        const res = await csrfFetch(`/api/friendships`,{
            method : 'POST',
            body: JSON.stringify({
              friendship:{
                userId,
                friendId
              }
            })
          })
           if (res.ok){
               dispatch(pushFriendId(userId,friendId))
           }
   }
    
    const handleClick = (e)=>{
        e.preventDefault()
        dispatch(makeFriend(userId,friendId)).then(()=>dispatch(makeFriend(friendId,userId)))
    


    }

    return(
        <button id = "addFriendButton" onClick={handleClick}><i className="fa-solid fa-user">
        </i> + Add Friend </button>
        
    )

}

export default AddFriend