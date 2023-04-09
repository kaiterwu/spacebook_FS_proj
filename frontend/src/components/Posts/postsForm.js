import { createPost, editPostPhoto, updatePost,removePostPhoto } from "../../store/posts";
import { useDispatch } from "react-redux";
import { useState } from "react";

const PostsForm = (props)=>{
    const dispatch = useDispatch()
    const user = props.user 
    const formType = props.type
    let post = props.post
    
    
    
    
    let profilePhoto;
    let initialPhoto
    
    if (user.avatar){
        profilePhoto = <img alt = 'avatar'src = {props.user.avatar}/>
    }else{
        profilePhoto = <i className="fa-solid fa-user-circle" />
    }
    
    let header,buttonText
    if (formType === 'Create'){
        header = 'Create Post'
        buttonText = 'Post'
        post = {
            body:'',
            userId:user.id
        }
    }else{
        header = 'Edit Post'
        buttonText = 'Save'
        initialPhoto = props.post.photo
    }
    const [body,setBody] = useState(post.body)
    const [photoFile,setPhotoFile] = useState(initialPhoto)
    const [photoUrl,setPhotoUrl] = useState(initialPhoto)

    const handleFile = ({ currentTarget }) => {
        const file = currentTarget.files[0];
        if (file) {
            setPhotoFile(file);
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoUrl(fileReader.result);
            
          }
        
    }
    let preview = null;
    let removeButton
    const handleRemove = (e)=>{
        e.preventDefault();
        setPhotoFile('')
        setPhotoUrl('')
    }
    if (photoUrl){
        removeButton = <i onClick={handleRemove} className = 'fa-solid fa-xmark removePostsPhoto '/>
        preview = <img id ='previewPostPhoto'src={photoUrl} alt="" />;
    } 
    
    const handleClick = (e) =>{
        e.preventDefault()
        post = {...post,body}
        const formData = new FormData()
        if (props.post){
            if(photoFile){
                formData.append('post[photo]',photoFile);
                dispatch(updatePost(post)).then(post=>{
                    dispatch(editPostPhoto(post,formData))
                }).then(()=>{props.setShowModal(false)})
            }else{
                dispatch(updatePost(post))
                dispatch(removePostPhoto(post)).then(()=>{props.setShowModal(false)})
            }
        }else{
            if(photoFile){
                formData.append('post[photo]',photoFile);
                dispatch(createPost(post)).then(post=>{
                    dispatch(editPostPhoto(post,formData))
                }).then(()=>{props.setShowModal(false)})
            }else{
                dispatch(createPost(post)).then(()=>{props.setShowModal(false)})
            }
        }
    }

    

    let submitButton = <button id = "invalidSubmitButton">{buttonText}</button>
    if (body){
        submitButton =  <button id = "formPostButton" onClick={handleClick}>{buttonText}</button>
    }
    return(
        <>  
                {removeButton}
            <div className="formPostsContainer">
                {/* <h1>{props.type}</h1> */}
                <h1 id = 'formPostsHeader'>{header}</h1>
                <div id = 'formpostsContent'>
                    <div id = 'formpostsName'>
                        
                        <div id = 'formpostIcon'>{profilePhoto}</div>
                        
                        <p>{props.user.firstName} {props.user.lastName}</p>
                    </div>
                        <textarea id = "postBody" value = {body} placeholder="What's on your mind?" 
                        onChange={(e)=>setBody(e.target.value)}/>

                        <div id = 'postsFormPhotoContainer'>
                            {preview}
                        </div>
                        <label id = 'submitPostPhoto'>
                            Upload Photo
                            <input className ="photoInput" type = 'file' onChange={handleFile} />
                        </label>
                        {submitButton}
                </div>

            </div>
        </>
    )
}

export default PostsForm