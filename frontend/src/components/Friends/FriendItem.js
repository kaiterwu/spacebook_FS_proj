import { useHistory } from "react-router-dom"
import './friends.css'

const FriendItem = (props)=>{
    const history = useHistory()
    const friend = props.friend 
    const type = props.type 
    let profilePhoto;

    let friendsContainer,friendsPhoto,friendsName,greenBubble;
    if (type === 'profilePage'){
        friendsContainer = 'profileFriendsContainer'
        friendsPhoto = 'squareFriendsPhoto'
        friendsName = 'friendsNameProfile'
    }else{
        friendsContainer = 'splashFriendsContainer'
        friendsPhoto = 'circleFriendsPhoto'
        friendsName = 'friendsNameSplash'
        greenBubble = <div id ='greenBubble'></div>
    }

    if (!friend) return null 

    if (friend.avatar){
        profilePhoto = <img alt = 'avatar'src = {friend.avatar}/>
    }else{
        profilePhoto = <i className="fa-solid fa-user-circle" />
    }

    const redirectShow = (userId)=>{
        history.push(`/users/${userId}`)
    }

    return(
        <div onClick={()=>redirectShow(friend.id)} className = {friendsContainer}>
                {/* {greenBubble} */}
            <div id = 'greenBubbleContainer'>
                <div id = {friendsPhoto}>
                    {profilePhoto}
                    {greenBubble}
                </div>
            </div>
            <div id = {friendsName}>
                <p>{friend.firstName}</p><p>{friend.lastName}</p>
            </div>
        </div>
    )
}

export default FriendItem