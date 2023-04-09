import React, { useState, useEffect } from "react";
import PostsModal from "../Modals/postModal";
import RemovePostModal from "../Modals/removePostModal";

const PostOptions = (props)=>{
    const [showMenu,setShowMenu] = useState(false)
    const user = props.user
    const post = props.post

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)

    }

    useEffect(()=>{
        if (!showMenu) return;
        const closeMenu = ()=>{
            setShowMenu(false);
        }
        document.addEventListener('click',closeMenu)
        return ()=>document.removeEventListener("click",closeMenu)
        },[showMenu]);

        let displayMenu;
        if (showMenu){
            displayMenu = 'postOptions'
        }else{
            displayMenu = 'hideMenu'
        }
    return(
        <>
            <button id = 'postOptionsButton' onClick={openMenu}>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            
                <ul id = {displayMenu}>
                    <li>
                       <PostsModal 
                        post = {post}
                        user = {user}
                        
                        />
                    </li>
                    <li>
                        <RemovePostModal
                            post = {post}
                        />
                    </li>
                </ul>
            
        </>
    )
}

export default PostOptions