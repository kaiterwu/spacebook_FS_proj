import { useState } from "react";
import { useEffect } from "react";
import RemoveCommentModal from "../Modals/removeCommentModal";

const CommentOptions = (props)=>{
    const[showMenu,setShowMenu] = useState(false)
    const comment = props.comment 
    const setDisplay = props.setDisplay

    const openMenu = ()=>{
        if (showMenu) return;
        setShowMenu(true)
    }

    useEffect(()=>{
        if (!showMenu) return;
        const closeMenu = ()=>{
            setShowMenu(false)
        }
        document.addEventListener('click',closeMenu)
        return ()=>document.removeEventListener("click",closeMenu)
        },[showMenu]);

        let displayMenu;
        if (showMenu){
            displayMenu = 'commentOptions'
        }else{
            displayMenu = 'hideMenu'
        }

    return(
        <>
            <div id = "commentOptionsContainer">
             <button id = 'commentOptionsB' onClick={openMenu}>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            <ul id = {displayMenu}>
                <li id ='editCommentButton'>
                    <button onClick={()=>{setDisplay(true)}} id ='editCommentButton'><i className="fa-solid fa-pencil"></i><p>Edit comment</p></button>
                </li>
                <li>
                    <RemoveCommentModal comment = {comment}/>
                </li>
            </ul>
            </div>

        </>
    )
        
}

export default CommentOptions