import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

// import './Navigation.css';

const Navigation = ()=>{
    const sessionUser = useSelector(state =>state.session.user);
    let sessionLinks;

    if(sessionUser){
        sessionLinks = (
            <ProfileButton id ='profile' user = {sessionUser}/>
        )
    }


    return (
        <ul>
        <div className = 'navlink'>
            {sessionLinks}
        </div>
        </ul>
    )
}

export default Navigation; 