import { useState } from "react";
import './photoForm.css'

const PhotoForm = (props)=>{
    const [photoFile,setPhotoFile] = useState(null)

    const handleFile = ({ currentTarget }) => {
        const file = currentTarget.files[0];
        setPhotoFile(file);
    }

    let photo;
    if (props.text=== 'Profile'){
        photo = 'Choose Profile Photo'
    }else{
        photo = 'Choose Cover Photo'
    }
    return(
        <>
        <form id = "photoForm">
            <div id = 'photoContainer'/>
            <div className="photoBContainer">
                <label id = 'labels'>
                    {photo}
                    <input class ="photoInput" type = 'file' />
                </label>
                <button id ="submitProfilePhoto" type = "submit">Upload Photo</button>
            </div>
        </form>

        </>
    )
}

export default PhotoForm