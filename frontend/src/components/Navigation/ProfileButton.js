import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import { useHistory } from "react-router";
import { fetchUser,getUser } from "../../store/users";

const ProfileButton = () => {
    const dispatch = useDispatch();
    const [showMenu,setShowMenu] = useState(false)
    const sessionUser = useSelector(state =>state.session.user);
    let history = useHistory()
    const user = useSelector(getUser(sessionUser.id))

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
        },[showMenu,dispatch]);
    
      useEffect(()=>{
        dispatch(fetchUser(sessionUser.id))
      },[dispatch,sessionUser.id])

    const logout = (e) =>{
        e.preventDefault();
        history.push('/')
        dispatch(sessionActions.logout());
    }
    if (!user) return null 

    const handleClick = ()=>{ 
      // debugger
      history.push(`/users/${user.id}`)
    }
    let avatar;
    if(sessionUser.avatar){
      avatar = <img alt ='profile' id = 'avataricon' src = {user.avatar}/>
    }else{
      avatar = <i className="fa-solid fa-user-circle placeAvatar" />
    }

    return (
        <>
        <div className="profile">
        <div className = 'dropdowns'>

          <button id ='profilebutton' onClick={openMenu}>
            {avatar}
          </button>
          {showMenu && (
            <ul className="profile-dropdown">
              <li id ="firstli" onClick={handleClick}>
              <div id ='smallavatar'>
                {avatar}
              </div>{`${user.firstName}`}
              </li>
            
              <li id ="logout" onClick={logout}><i className="fa-solid fa-door-open"></i> Log Out</li>
            </ul>
          )}
        </div>
        </div>
        </>
      );
    }
    
    export default ProfileButton;
