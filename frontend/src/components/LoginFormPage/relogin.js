import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './reloginForm.css';

const ReloginForm = ()=>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    // const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/"/>;
    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors([]);
         dispatch(sessionActions.login({email,password}))
        .catch(async (res) =>{
            // const data = await res.json();
            // if (data.errors) setErrors(data.errors);
        });
    }
    const handleDemoClick = (e)=>{
        e.preventDefault()
        dispatch(sessionActions.login({email:'test@test.com',password:'password'}))
    }

    return(
        <>
        <div className='reloginPage'>
        <div className = "relogHeading">
        <h1 id ='reloginheader'>Spacebook</h1>
        
        </div>
            <div className='reloginwindow'>

            <div class = 'formwindow'>
            <form className="login" onSubmit = {handleSubmit}>
            <ul className = 'reloginErrors'>
                {/* {errors.map(error => <li key={error}>▲{error}</li>)} */}
            </ul>
                <div className='emailErrors'>
                <input id ='erroremail' type="text" value = {email} onChange = {(e)=>setEmail(e.target.value)}
                placeholder = 'Email' required/>
                <p>▲ The email you entered isn’t connected to an account.<br/> <b>Find your account and log in.</b></p>
                </div>

        
            
                <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)}
                placeholder = "Password" required/>
            
    
            <button id="submit" type="submit">Log In</button>
            </form>
                <div id ='otherButtons'>
                <button id ='demo' onClick={handleDemoClick}>Demo User</button>
                </div>
            </div>
        </div>
        <div className='footer'></div>
        </div>
            
        </>
    )
}

export default ReloginForm