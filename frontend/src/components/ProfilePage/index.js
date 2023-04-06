
import { useSelector,useDispatch } from "react-redux"
import { fetchUser,getUser } from "../../store/users"
import { useParams } from "react-router"
import { useEffect } from "react"
import './ProfilePage.css'
import FormModal from "../FormModal"

const getBirthday = (str)=>{
    let date = new Date(str)
    return date.toUTCString().slice(4,16)
}
const ProfilePage = ()=>{
    const dispatch = useDispatch()
    const {userId} = useParams()
    const user = useSelector(getUser(userId))
    const sessionUser = useSelector(state =>state.session.user);
    let editButton;
    let commentButton;
    // debugger
    if (sessionUser.id === parseInt(userId)){
        editButton = <FormModal/>
        commentButton = <div id = 'createPost'>
        <i className="fa-solid fa-user-circle" />
        <button>What's on your mind?</button>
    </div>
    }
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
            <div id = 'profilephoto'> <i className="fa-solid fa-user-circle" /></div>
            <p id = 'profileName'>{user?.firstName} {user?.lastName}</p>
            </div>
            {editButton}
            </div>
        </section>
        <section className = 'bottomHalf'>
            <div className = 'bio'>
                <div id = 'aboutMe'>
                    <h2><i className="fa-regular fa-address-card"></i> About Me</h2>
                   <p>{user?.aboutMe}</p> 
                </div>
                <div id = "basicInfo">
                    <h2>Basic Info</h2>
                    <div><i className="fa-regular fa-envelope"></i> Email</div>
                    <p>{user?.email}</p>
                    <div><i className="fa-solid fa-cake-candles"></i> Birthday</div>
                    <p>{getBirthday(user?.birthday)}</p>
                    <div><i className="fa-solid fa-transgender"></i>Gender</div>
                    <p>{user?.gender}</p>
                </div>
            </div>
            <div className = 'posts'>
                    {commentButton}
                <div className= 'postsContainer'>

                </div>

            </div>
        </section>
        </div>
        </>
    )
}

export default ProfilePage