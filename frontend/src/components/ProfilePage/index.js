
import { useSelector,useDispatch } from "react-redux"
import { fetchUser,getUser } from "../../store/session"
import { useParams } from "react-router"
import { useEffect } from "react"


const ProfilePage = ()=>{
    const dispatch = useDispatch()
    const {userId} = useParams()
    const user = useSelector(getUser(userId))
    // const history = useHistory()

    useEffect(()=>{
        dispatch(fetchUser(userId))
    },[dispatch,userId])

    return(
        <>
            <p>{user}</p>
        </>
    )
}

export default ProfilePage