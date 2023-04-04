
import { useSelector,useDispatch } from "react-redux"
import { fetchUser,getUser } from "../../store/users"
import { useParams } from "react-router"
import { useEffect } from "react"
import './ProfilePage.css'

const getBirthday = (str)=>{
    let date = new Date(str)
    return date.toString().slice(4,15)
}
const ProfilePage = ()=>{
    const dispatch = useDispatch()
    const {userId} = useParams()
    const user = useSelector(getUser(userId))
    // debugger
    console.log('rendering profile page')
    useEffect(()=>{
        dispatch(fetchUser(userId))
    },[userId,dispatch])
    return(
        <>
        <div id = 'profilepage'>

        <section className="topHalf">
            <div className ='Photo'>

            </div>
            <div className ='nameButtons'>
            <div className = 'photoName'>
            <div id = 'profilephoto'></div>
            <p id = 'profileName'>{user?.firstName} {user?.lastName}</p>
            </div>
            <button id = "editProfile">✎ Edit Profile</button>
            </div>
        </section>
        <section className = 'bottomHalf'>
            <div className = 'bio'>
                <div id = 'aboutMe'>
                    <h2>About Me</h2>
                   <p>{user?.aboutMe}</p> 
                </div>
                <div id = "basicInfo">
                    <h2>Basic Info</h2>
                    <div>Email</div>
                    <p>{user?.email}</p>
                    <div>Birthday</div>
                    <p>{getBirthday(user?.birthday)}</p>
                    <div>Gender</div>
                    <p>{user?.gender}</p>
                </div>
            </div>
            <div className = 'postsIndex'>

            </div>
        </section>
        </div>
        </>
    )
}

export default ProfilePage