import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useHistory } from 'react-router-dom';
import SearchList from './searchList';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchUsers } from '../../store/users';


import './Navigation.css';

const Navigation = ()=>{
    const sessionUser = useSelector(state =>state.session.user);
    let sessionLinks;
    const history = useHistory()
    // const dispatch = useDispatch()

    if(sessionUser){
        sessionLinks = (
            <div className = 'navlink'>
            <div id = "searchAndLogo">
                <div id='logo' onClick={()=>history.replace('/')}>S</div>
                <SearchList/>
            </div>
            <ProfileButton id ='profile' user = {sessionUser}/>
            </div>
        )
    }
    // useEffect(()=>{
    //     dispatch(fetchUsers())
    // },[])


    return (
        <>
            {sessionLinks}
        </>
        
    )
}

export default Navigation; 