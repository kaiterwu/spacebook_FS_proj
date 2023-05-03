import { useEffect } from "react"
import { useDispatch,useSelector} from "react-redux"
import { getFriends,fetchFriends } from "../../store/friends"
import FriendItem from "./FriendItem"


const ProfileFriends = (props)=>{
    const dispatch = useDispatch()
    const profileFriends = useSelector(getFriends)
    const user = props.user 

    useEffect(()=>{
        dispatch(fetchFriends(user.id))
    },[dispatch,user.id])
    return(
        <> 
                <div className = 'outerFriendsProfile'>
                    {profileFriends.map(friend =><FriendItem
                        key = {friend.id}
                        friend = {friend}
                        type = {'profilePage'}
                    />)}
                </div>
        </>
    )
}

export default ProfileFriends 