import { useEffect } from "react"
import { useDispatch,useSelector} from "react-redux"
import { getFriends,fetchFriends } from "../../store/friends"
import FriendItem from "./FriendItem"


const SplashFriends = (props)=>{
    const dispatch = useDispatch()
    const profileFriends = useSelector(getFriends)
    const sessionUser = useSelector(state =>state.session.user);


    useEffect(()=>{
        dispatch(fetchFriends(sessionUser.id))
    },[dispatch,sessionUser.id])
    return(
        <>
            <div className = 'splashFriendsProfile'>
                {profileFriends.map(friend =><FriendItem
                    friend = {friend}
                    type = {'splashPage'}
                />)}
            </div>
        </>
    )
}

export default SplashFriends 