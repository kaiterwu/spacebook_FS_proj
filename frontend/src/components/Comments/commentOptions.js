import { useState } from "react";
import { useEffect } from "react";

const CommentOptions = (props)=>{
    const[showMenu,setShowMenu] = useState(false)

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
             <button id = 'commentOptionsB' onClick={openMenu}>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            <ul id = {displayMenu}>

            </ul>

        </>
    )
        
}

export default CommentOptions