import { useEffect } from "react"
import { useDispatch,useSelector} from "react-redux"
import FriendItem from "./FriendItem"
import { getUsers,fetchUsers } from "../../store/users"


const ProfileFriends = (props)=>{
    const dispatch = useDispatch()
    // const profileFriends = useSelector(getFriends)
    const allUsers = useSelector(getUsers)
    const user = props.user 
    const profileFriends = user?.friends.map(friendId => allUsers[friendId])

    useEffect(()=>{
        dispatch(fetchUsers())
    },[dispatch])
    return(
        <> 
                <div className = 'outerFriendsProfile'>
                    {profileFriends.map(friend =><FriendItem
                        key = {friend?.id}
                        friend = {friend}
                        type = {'profilePage'}
                    />)}
                </div>
        </>
    )
}

export default ProfileFriends 