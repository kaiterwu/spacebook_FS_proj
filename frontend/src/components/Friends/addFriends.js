import csrfFetch from "../../store/csrf"
import { useDispatch } from "react-redux"
import { receiveFriends } from "../../store/friends"
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
               let friends = await res.json()
               dispatch(receiveFriends(friends))
         

           }
   }
    
    const handleClick = (e)=>{
        e.preventDefault()
        dispatch(makeFriend(userId,friendId)).then(()=>dispatch(makeFriend(friendId,userId)))
        // history.go(0)
    


    }

    return(
        <button id = "addFriendButton" onClick={handleClick}><i className="fa-solid fa-user">
        </i> + Add Friend </button>
        
    )

}

export default AddFriend