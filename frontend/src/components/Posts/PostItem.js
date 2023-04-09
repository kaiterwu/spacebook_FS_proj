import PostOptions from "./PostOptions";
export const PostItem = (props)=>{
    let profilePhoto;
    let sessionProfilePhoto;
    let postsPhoto
    let optionsDropdown
    
    if (props.user.avatar){
        profilePhoto = <img alt = 'avatar'src = {props.user.avatar}/>
    }else{
        profilePhoto = <i className="fa-solid fa-user-circle" />
    }

    if (props.sessionUser.avatar){
        sessionProfilePhoto= <img alt = 'avatar'src = {props.sessionUser.avatar}/>
    }else{
        sessionProfilePhoto= <i className="fa-solid fa-user-circle" />
    }
    let displayPhoto;
    if (props.post.photo){
        postsPhoto = <img id ='postsPhoto' alt = 'avatar'src = {props.post.photo}/>
        displayPhoto = 'postsPhotoContainer'
    }else{
        <img id ='postsPhoto' alt = 'avatar'src = {props.sessionUser.avatar}/>
        displayPhoto = 'hiddenPhoto'
    }

    if (props.sessionUser.id === props.user.id){
        optionsDropdown = <PostOptions user = {props.sessionUser} post = {props.post}/>
    }
    

    return(
        <div key = {props.post.id} className="userPostsContainer">
                    <div id = 'postsContent'>
                        <div>
                            <div id = 'postIcon'>{profilePhoto}</div>
                        </div>
                        <p>{props.user.firstName} {props.user.lastName}</p>
                    {optionsDropdown}
                    </div>
                    <p id = "postsBody">{props.post.body}</p>
                    <div id = {displayPhoto}>
                        {postsPhoto}
                    </div>
                    <div id = 'likeComment'>
                        <p><i className="fa-regular fa-thumbs-up"></i> Like</p>
                        <p><i className="fa-regular fa-message"></i> Comment</p>
                        
                    </div>
                    <div id = 'replyContainer'>
                        <div id = 'replyIcon'>{sessionProfilePhoto}</div>
                        <input placeholder ='Write a comment'></input>
                    </div>
                </div>
    )

}

export default PostItem