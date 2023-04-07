import React, { useState,useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchUser } from '../../store/users';
import { getUser } from '../../store/users';
import './reloginForm.css';

const ReloginForm = ()=>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors, setErrors] = useState([`The email you entered isn’t connected to an account. Find your account and log in.`]);
    const user = useSelector(getUser(1))

    useEffect(()=>{
        dispatch(fetchUser(1))
    },[dispatch])
    if (sessionUser) return <Redirect to="/"/>;
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
         dispatch(sessionActions.login({email,password}))
        .catch(async (res) =>{
            const data = await res.json();
            if (data.errors) {
                setErrors(data.errors);
            
            }
        
                
        });
    }
    const handleDemoClick = (e)=>{
        e.preventDefault()
        dispatch(sessionActions.login({email:user.email,password:'password'}))
    }

    

    return(
        <>
        <div className='reloginPage'>
        <div className = "relogHeading">
        <h1 id ='reloginheader'>Spacebook</h1>
        
        </div>
            <div className='reloginwindow'>

            <div className = 'formwindow'>
            <p>Log into Spacebook</p>
            <form className="login" onSubmit = {handleSubmit}>
            
                <div className='emailErrors'>
                <input id ='erroremail' type="text" value = {email} onChange = {(e)=>setEmail(e.target.value)}
                placeholder = 'Email'/>
                    {errors.map(error => <div key={error}><i className="fa-solid fa-triangle-exclamation"></i> {error}</div>)}
                </div>

        
            
                <input id='rePassword' type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)}
                placeholder = "Password"/>
            
    
            <button id="submit" type="submit">Log In</button>
            </form>
                <div id ='otherButtons'>
                <button id ='reDemo' onClick={handleDemoClick}>Demo User</button>
                </div>
            </div>
        </div>
        </div>
        <div className='refooter'></div>
            
        </>
    )
}

export default ReloginForm