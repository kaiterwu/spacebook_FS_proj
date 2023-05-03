
import { useSelector,useDispatch } from "react-redux"
import { fetchUser, getUser } from "../../store/users"
import { useParams } from "react-router"
import { useEffect } from "react"
import FormModal from "../Modals/formModal"
import { fetchUsers } from "../../store/users"
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
    const friends = user?.friends
    // const allFriends = Object.values(friends)
    const loggedInUser = useSelector(getUser(loggedInId))
    // const friendsArr = allFriends.map(friend => friend.id)

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
        if (friends?.includes(loggedInId)){
            
            editButton = <RemoveFriendModal userId = {sessionUser.id} friendId = {user?.id}/>
        }else{
            editButton = <AddFriend userId = {sessionUser.id} friendId = {user?.id}/>
        }
    }

    useEffect(()=>{
        dispatch(fetchUsers())
        dispatch(fetchUser(userId))
    },[userId,dispatch])

    let profilePhoto;
    let coverPhoto;
    let coverStyle;
    let blurLayerStyle;
    
    if (!user) return null 
   
    if (user.avatar){
        profilePhoto = <img alt = 'avatar' id = "avatar" src = {user.avatar}/>
    }else{
        profilePhoto = <i className="fa-solid fa-user-circle mainphoto" />
    }

    if (user.cover){
        coverPhoto = <img alt = 'avatar' id = 'coverphoto' src = {user.cover}/>
        coverStyle = {
            maxWidth: "100%",
            height:"45vw",
            display:"flex",
            flexDirection: "column",
            backgroundImage:`url(${user.cover})`,
            backgroundSize:"cover",
            borderBottom:"1px solid rgb(213, 213, 213)",
            position:"relative",
            zIndex:"0"
            // filter: "blur(10px)"
        };
         blurLayerStyle = {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            // filter: "blur(5px) opacity(100%) ",
            // backgroundImage:`url(${user.cover})`,
            backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 1),white)",
            zIndex: "-1",
            
          };
    }else{
        coverPhoto = <i className="fa-solid fa-panorama coverimage"></i>
        coverStyle = {
            maxWidth: "100%",
            height:"45vw",
            display:"flex",
            flexDirection: "column",
            backgroundImage:"linear-gradient(rgb(148, 148, 148),white,white)",
            borderBottom:"1px solid rgb(213, 213, 213)",
            position:"relative"
        };
    }
    
    
    return(
        <>
        <div id = 'profilepage'>

        <section style = {coverStyle}>
            <div style = {blurLayerStyle}></div>
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
                                <h1>{friends.length} friends</h1>
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
                        <h2>{friends.length} friends</h2>
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