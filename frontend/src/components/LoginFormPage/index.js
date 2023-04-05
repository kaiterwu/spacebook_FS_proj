import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FormModal from '../FormModal';
import './LoginForm.css';
import { useHistory } from 'react-router-dom';

function LoginFormPage(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    // const [errors, setErrors] = useState([]);
    const history = useHistory()
    
    if (sessionUser) return <Redirect to="/"/>;
    // debugger
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors([]);
         dispatch(sessionActions.login({email,password}))
        .catch(async (res) =>{
            const data = await res.json();
            // if (data.errors) setErrors(data.errors);
            if(data.errors) history.push('/relogin')
        });
    }

    const handleDemoClick = (e)=>{
        e.preventDefault()
        dispatch(sessionActions.login({email:'test@test.com',password:'password'}))
    }
    // debugger
    return(
        <>
        <div className='LoginPage'>
        <div className = "headings">
        <h1>Spacebook</h1>
        <p>Connect with planets and stars around the Universe with Spacebook. </p>
        </div>
        <div className='loginwindow'>

        <div className = 'formwindow'>
        <form className="login" onSubmit = {handleSubmit}>
        <ul className = 'loginErrors'>
            {/* {errors.map(error => <li key={error}>▲{error}</li>)} */}
        </ul>
         
            <input type="text" value = {email} onChange = {(e)=>setEmail(e.target.value)}
             placeholder = 'Email' required/>

    
        
            <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)}
            placeholder = "Password" required/>
        
  
        <button id="submit" type="submit">Log In</button>
        </form>
        <div id ='otherButtons'>

        <button id ='demo' onClick={handleDemoClick}>Demo User</button>
        <FormModal/>
        </div>

        </div>
        <p> <b>Create a page</b> for any astral body. </p>
        </div>
        <div className='footer'></div>
        </div>
        </>
    );
}

export default LoginFormPage