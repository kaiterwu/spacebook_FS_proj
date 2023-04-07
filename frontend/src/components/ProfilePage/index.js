
import { useSelector,useDispatch } from "react-redux"
import { getUser } from "../../store/users"
import { useParams } from "react-router"
import { useEffect } from "react"
import './ProfilePage.css'
import FormModal from "../Modals/formModal"
import { fetchUser } from "../../store/users"
import PostsModal from "../Modals/postModal"
import PhotoModal from "../Modals/photoModal"


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
    let editProfilePhoto;
    let editCoverPhoto;
    
    if (sessionUser.id === parseInt(userId)){
        editButton = <FormModal/>
        commentButton =<PostsModal/>
        editProfilePhoto= <PhotoModal text = {'Profile'}/>
        editCoverPhoto = <PhotoModal text = {'Cover'}/>

    }

    console.log('rendering profile page')
    useEffect(()=>{
        dispatch(fetchUser(userId))
    },[userId,dispatch])
    let profilePhoto;
    let coverPhoto;
    
    if (!user) return null 
   
    if (user.avatar){
        profilePhoto = <img alt = 'avatar' id = "avatar" src = {user.avatar}/>
        coverPhoto = <img alt = 'avatar' id = 'coverphoto' src = {user.cover}/>
    }else{
        profilePhoto = <i className="fa-solid fa-user-circle mainphoto" />
        coverPhoto = <i class="fa-solid fa-panorama coverimage"></i>
    }
    return(
        <>
        <div id = 'profilepage'>

        <section className="topHalf">
            <div className ='coverPhoto'>
                {coverPhoto}
                {editCoverPhoto}
            </div>
            <div className ='nameButtons'>
                <div id = 'profileinfo'>
                    <div id = 'profilephoto'> {profilePhoto}</div>
                        <div id ='photoAndName'>
                        <p id = 'profileName'>{user.firstName} {user.lastName}</p>
                        {editProfilePhoto}
                        </div>
                    </div>
                {editButton}
            </div>
        </section>
        <section className = 'bottomHalf'>
            <div className = 'bio'>
                <div id = 'aboutMe'>
                    <h2><i className="fa-regular fa-address-card"></i> About Me</h2>
                   <p>{user.aboutMe}</p> 
                </div>
                <div id = "basicInfo">
                    <h2>Basic Info</h2>
                        <div>
                            <div><i className="fa-solid fa-cake-candles"></i> Birthday:</div>
                            <p>{getBirthday(user?.birthday)}</p>
                        </div>
                        <div>
                            <div><i className="fa-regular fa-envelope"></i> Email:</div>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <div><i className="fa-solid fa-transgender"></i>Gender:</div>
                            <p>{user.gender}</p>
                        </div>
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