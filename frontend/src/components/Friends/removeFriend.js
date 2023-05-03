import csrfFetch from "../../store/csrf"
import { useDispatch } from "react-redux"
import { removeFriendId } from "../../store/users"
const RemoveFriend = (props)=>{
    const userId = props.userId
    const friendId = props.friendId
    const dispatch = useDispatch()
 
    const deleteFriend = (userId,friendId) => async() =>{
        const res = await csrfFetch(`/api/delete-friends`,{
            method : 'DELETE',
            body: JSON.stringify({
              friendship:{
                userId,
                friendId
              }
            })
          })
           if (res.ok){
               dispatch(removeFriendId(userId,friendId))
           }
   }
    
    const handleClick = (e)=>{
        e.preventDefault()
        dispatch(deleteFriend(userId,friendId)).then(()=>dispatch(deleteFriend(friendId,userId)))
        .then(()=>{props.setShowModal(false)})
    


    }

    return(
        <button onClick={handleClick}>Confirm</button>
    )

}

export default RemoveFriend