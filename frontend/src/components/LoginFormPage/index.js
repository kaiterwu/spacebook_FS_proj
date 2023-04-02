import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    if (sessionUser) return <Redirect to="/"/>;
    // debugger
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
         dispatch(sessionActions.login({email,password}))
        .catch(async (res) =>{
            const data = await res.json();
            if (data.errors) setErrors(data.errors);
        });
    }
    // debugger
    return(
        <form className="login" onSubmit = {handleSubmit}>
        <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
     
            <input type="text" value = {email} onChange = {(e)=>setEmail(e.target.value)}
             placeholder = 'Email' required/>
    
            <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)}
            placeholder = "Password" required/>
  
        <button type="submit">Log In</button>
    </form>
    );
}

export default LoginFormPage