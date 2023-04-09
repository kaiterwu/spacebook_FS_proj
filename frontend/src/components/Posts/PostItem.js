export const PostItem = (props)=>{
    let profilePhoto;
    let sessionProfilePhoto;
    let postsPhoto
    
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

    if (props.post.photo){
        postsPhoto = <img id ='postsPhoto' alt = 'avatar'src = {props.post.photo}/>
    }else{
        <img id ='postsPhoto' alt = 'avatar'src = {props.sessionUser.avatar}/>
    }


    return(
        <div key = {props.post.id} className="userPostsContainer">
                    <div id = 'postsContent'>
                        <div>
                            <div id = 'postIcon'>{profilePhoto}</div>
                        </div>
                        <p>{props.user.firstName} {props.user.lastName}</p>
                    </div>
                    <p id = "postsBody">{props.post.body}</p>
                    <div id = 'postsPhotoContainer'>
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