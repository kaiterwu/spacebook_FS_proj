import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useHistory } from 'react-router-dom';


// import './Navigation.css';

const Navigation = ()=>{
    const sessionUser = useSelector(state =>state.session.user);
    let sessionLinks;
    const history = useHistory()

    if(sessionUser){
        sessionLinks = (
            <div className = 'navlink'>
            <div id='logo' onClick={()=>history.replace('/')}>S</div>
            <ProfileButton id ='profile' user = {sessionUser}/>
            </div>
        )
    }


    return (
        <>
            {sessionLinks}
        </>
        
    )
}

export default Navigation; 