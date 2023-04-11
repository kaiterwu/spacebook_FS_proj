
import { useSelector,useDispatch } from "react-redux"
import { getUser } from "../../store/users"
import { useParams } from "react-router"
import { useEffect } from "react"
import FormModal from "../Modals/formModal"
import { fetchUser } from "../../store/users"
import PostsModal from "../Modals/postModal"
import PhotoModal from "../Modals/photoModal"
import UserPosts from "../Posts/UserPosts"
import ProfileFriends from "../Friends/profileFriends"
import AddFriend from "../Friends/addFriends"
import './ProfilePage.css'
import RemoveFriendModal from "../Modals/removeFriendModal"


const getBirthday = (str)=>{
    let date = new Date(str)
    return date.toUTCString().slice(4,16)
}
const ProfilePage = ()=>{
    const sessionUser = useSelector(state =>state.session.user);
    const loggedInId = sessionUser.id
    const dispatch = useDispatch()
    const {userId} = useParams()
    const user = useSelector(getUser(userId))
    const friends = useSelector(state => state.friends)
    const allFriends = Object.values(friends)
    const loggedInUser = useSelector(getUser(loggedInId))
    const friendsArr = allFriends.map(friend => friend.id)

    // debugger
    let editButton;
    let createPostButton;
    let editProfilePhoto;
    let editCoverPhoto;


    
 
    
    if (sessionUser.id === parseInt(userId)){
        editButton = <FormModal/>
        createPostButton =<PostsModal type = {'Create'} user = {loggedInUser}/>
        editProfilePhoto= <PhotoModal text = {'Profile'}/>
        editCoverPhoto = <PhotoModal text = {'Cover'}/>

    }else{
        if (friendsArr.includes(loggedInId)){
            
            editButton = <RemoveFriendModal userId = {sessionUser.id} friendId = {user?.id}/>
        }else{
            editButton = <AddFriend userId = {sessionUser.id} friendId = {user?.id}/>
        }
    }

    useEffect(()=>{
        dispatch(fetchUser(userId))
    },[userId,dispatch])

    let profilePhoto;
    let coverPhoto;
    
    if (!user) return null 
   
    if (user.avatar){
        profilePhoto = <img alt = 'avatar' id = "avatar" src = {user.avatar}/>
    }else{
        profilePhoto = <i className="fa-solid fa-user-circle mainphoto" />
    }

    if (user.cover){
        coverPhoto = <img alt = 'avatar' id = 'coverphoto' src = {user.cover}/>
    }else{
        coverPhoto = <i className="fa-solid fa-panorama coverimage"></i>
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
                             <div id = 'friendHeaderContainer'>
                                <p id = 'profileName'>{user.firstName} {user.lastName}</p>
                                <h1>{allFriends.length} friends</h1>
                                {editProfilePhoto}
                             </div>
                        </div>
                    </div>
                {editButton}
            </div>
        </section>
        <section className = 'bottomHalf'>
            <div id = 'leftContainer'>
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
                <div id = 'friendsContainer'>
                <div id = 'innerfriendsContainer'>
                    <div id = 'profilefriendHeaders'>
                        <h1>Friends</h1>
                        <h2>{allFriends.length} friends</h2>
                    </div>
                    <ProfileFriends user = {user}/>
                </div>
                </div>
            </div>
            <div className = 'posts'>
                    {createPostButton}
                <div id = "postsHeader">
                   <p><i className="fa-regular fa-clipboard"></i> Posts</p>
                </div>
                <div className= 'postsContainer'>
                    <UserPosts user= {user} sessionUser = {loggedInUser}/>
                </div>

            </div>
        </section>
        </div>
        </>
    )
}

export default ProfilePage