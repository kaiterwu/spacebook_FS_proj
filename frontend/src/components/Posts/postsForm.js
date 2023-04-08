const PostsForm = (props)=>{
    const user = props.user 
    const formType = props.type

    let profilePhoto;

    if (user.avatar){
        profilePhoto = <img alt = 'avatar'src = {props.user.avatar}/>
    }else{
        profilePhoto = <i className="fa-solid fa-user-circle" />
    }
    
    let header,buttonText
    if (formType === 'Create'){
        header = 'Create Post'
        buttonText = 'Post'
    }
    return(
        <>  
            <div className="formPostsContainer">
                {/* <h1>{props.type}</h1> */}
                <h1 id = 'formPostsHeader'>{header}</h1>
                <div id = 'formpostsContent'>
                    <div id = 'formpostsName'>
                        
                        <div id = 'formpostIcon'>{profilePhoto}</div>
                        
                        <p>{props.user.firstName} {props.user.lastName}</p>
                    </div>
                        <textarea id = "postBody" placeholder="What's on your mind?"></textarea>
                        <div id = 'postsFormPhotoContainer'></div>
                        <button id = "submitPostPhoto">Upload Photo</button>
                        <button id = "formPostButton">{buttonText}</button>
                </div>

            </div>
        </>
    )
}

export default PostsForm