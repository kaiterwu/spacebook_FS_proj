import { useEffect } from "react"
import { useDispatch,useSelector} from "react-redux"
import { fetchComments } from "../../store/comments"
import FriendItem from "./FriendItem"
import { getUsers,fetchUsers } from "../../store/users"


const SplashFriends = (props)=>{
    const dispatch = useDispatch()
    // const profileFriends = useSelector(getFriends)
    const allUsers = useSelector(getUsers)
    const sessionUser = useSelector(state =>state.session.user);
    const profileFriends = sessionUser?.friends.map(friendId => allUsers[friendId])


    useEffect(()=>{
        dispatch(fetchUsers())
        dispatch(fetchComments())
    },[dispatch])
    return(
        <>
            <div className = 'splashFriendsProfile'>
                {profileFriends.map(friend =><FriendItem
                    key = {friend?.id}
                    friend = {friend}
                    type = {'splashPage'}
                />)}
            </div>
        </>
    )
}

export default SplashFriends 