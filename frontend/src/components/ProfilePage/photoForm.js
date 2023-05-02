import { useState } from "react";
import './photoForm.css'
import { getUser, removeAvatar, removeCover } from "../../store/users";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editPhotos } from "../../store/users";

const PhotoForm = (props)=>{

    const {userId} = useParams()
    let user = useSelector(getUser(userId))
    const dispatch = useDispatch()

    let label;
    let photo;
    let initialPhoto;
    let photoContainer;
    let previewPhoto; 
    let removePhoto

    if (props.text=== 'Profile'){
        label = 'Choose Profile Photo'
        initialPhoto = user.avatar
        photo = 'avatar'
        photoContainer = 'profileContainer'
        previewPhoto = 'previewProfilePhoto'
        removePhoto = "fa-solid fa-xmark removeProfile"
    }else{
        label = 'Choose Cover Photo'
        initialPhoto = user.cover
        photo = 'cover'
        photoContainer = 'coverContainer'
        previewPhoto = 'previewCoverPhoto'
        removePhoto = "fa-solid fa-xmark removeCover"
    }

    const [photoFile,setPhotoFile] = useState(initialPhoto)
    const [photoUrl,setPhotoUrl] = useState(initialPhoto)
    const [errors,setErrors] = useState([])

    const handleFile = ({ currentTarget }) => {
        const file = currentTarget.files[0];
        if (file) {
            setPhotoFile(file);
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoUrl(fileReader.result);
            
          }
    }
    const handleSubmit = async e =>{
        e.preventDefault();
        const formData = new FormData()
        if (photoFile){
            formData.append(`user[${photo}]`,photoFile);
            dispatch(editPhotos(user,formData)).then(()=>{props.setShowModal(false)})
            .catch(async(res)=>{
                const data = await res.json();
                if (data.title === 'Server Error') return setErrors(['Please select a photo.'])
            })
        }else{
            if (props.text === 'Profile'){
                dispatch(removeAvatar(user)).then(()=>{props.setShowModal(false)})
            }else{
                dispatch(removeCover(user)).then(()=>{props.setShowModal(false)})
            }
        }
    }

    const handleRemove = (e)=>{
        e.preventDefault();
        setPhotoFile('')
        setPhotoUrl('')
    }
    let hideRemove;
    let preview = null;
    if (photoUrl) {
        preview = <img id ={previewPhoto} src={photoUrl} alt="" />
        // if (props.text=== 'Profile'){
        //     removePhoto = "fa-solid fa-xmark removeProfile"
        // }else{
        //     removePhoto = "fa-solid fa-xmark removeCover"
        // }
    }else{
        hideRemove = 'hideRemove'
        if (props.text=== 'Profile'){
            preview = <i className="fa-solid fa-user-circle previewProfile " />
        }else{
            preview = <i className="fa-solid fa-panorama previewCover"></i>
        }
    }
    return(
        <>
        <i className={`${removePhoto} ${hideRemove}`} onClick={handleRemove}/>
        <form id = "photoForm" onSubmit={handleSubmit}>
        <ul className = 'photoErrors'>
             {errors.map(error => <li key={error}><i className="fa-solid fa-triangle-exclamation"></i> {error}</li>)}
        </ul>
            <div id = {photoContainer}>
                {preview}
            </div>
            <div className="photoBContainer">
                <label id = 'labels'>
                    {label}
                    <input className ="photoInput" type = 'file' onChange={handleFile} />
                </label>
                <button id ="submitProfilePhoto" type = "submit">Change Photo</button>
            </div>
        </form>

        </>
    )
}

export default PhotoForm