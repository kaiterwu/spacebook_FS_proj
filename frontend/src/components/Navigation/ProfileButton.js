import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css'
import { useHistory } from "react-router";

const ProfileButton = ({user}) => {
    const dispatch = useDispatch();
    const [showMenu,setShowMenu] = useState(false)
    let history = useHistory()

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

    const logout = (e) =>{
        e.preventDefault();
        history.push('/')
        dispatch(sessionActions.logout());
    }

    const handleClick = ()=>{ 
      history.replace(`/users/${user.id}`)
    }

    return (
        <>
        <div className="profile">
        <div className = 'dropdowns'>

          <button id ='profilebutton' onClick={openMenu}>
            <i className="fa-solid fa-user-circle" />
          </button>
          {showMenu && (
            <ul className="profile-dropdown">
              <li id ="firstli" onClick={handleClick}> <i className="fa-solid fa-user-circle" /> {`${user.firstName}`}</li>
              {/* <li>{user.email}</li> */}
              <li id ="logout'" onClick={logout}>Logout <i className="fa-solid fa-door-open"></i></li>
            </ul>
          )}
        </div>
        </div>
        </>
      );
    }
    
    export default ProfileButton;
