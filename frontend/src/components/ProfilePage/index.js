
import { useSelector,useDispatch } from "react-redux"
import { fetchUser,getUser } from "../../store/users"
import { useParams } from "react-router"
import { useEffect } from "react"


const ProfilePage = ()=>{
    const dispatch = useDispatch()
    const {userId} = useParams()
    const user = useSelector(getUser(userId))
    console.log('rendering profile page')
    useEffect(()=>{
        dispatch(fetchUser(userId))
    },[userId,dispatch])

    return(
        <>
            <p>{user?.user.email}</p>
            <p>{user?.user.birthday}</p>
            <p>{user?.user.firstName}</p>
            <p>{user?.user.lastName}</p>
            <p>{user?.user.gender}</p>
        </>
    )
}

export default ProfilePage