import React, { useState,useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FormModal from '../Modals/formModal';
import './LoginForm.css';
import { useHistory } from 'react-router-dom';
import { fetchUser } from '../../store/users';
import { getUser } from '../../store/users';

function LoginFormPage(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    // const [errors, setErrors] = useState([]);
    const history = useHistory()
    
    useEffect(()=>{
        dispatch(fetchUser(1))
    },[dispatch])

    const user = useSelector(getUser(1))

    if (sessionUser) return <Redirect to="/"/>;
    
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
        dispatch(sessionActions.login({email:user.email,password:'password'}))
    }
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
       
         
            <input type="text" value = {email} onChange = {(e)=>setEmail(e.target.value)}
             placeholder = 'Email' />

    
        
            <input type = "password" value = {password} onChange = {(e) => setPassword(e.target.value)}
            placeholder = "Password" />
        
  
        <button id="submit" type="submit">Log In</button>
        </form>
        <div id ='otherButtons'>

        <button id ='demo' onClick={handleDemoClick}>Demo Log In</button>
        <FormModal/>
        </div>

        </div>
        <p> <b>Create a page</b> for any astral body. </p>
        </div>
        <div className='footer'>
        <div id ='footerText'>
            <div id = "socialLinks">
                Socials: <a target ="_blank" href = "https://github.com/kaiterwu">GitHub</a> 
                <a target = "_blank" href = "https://www.linkedin.com/in/kaiter-wu-7ba70a62/">LinkedIn</a>
                <a target = "_blank" href = "https://wellfound.com/u/kaiter-wu">WellFound </a>
                <a target = "_blank" href = "https://kaiterwu.xyz/">Portfolio</a>
                <a target = "_blank" href = "https://kaiterwu.github.io/Cycle_js_proj/">Cycle</a>
            </div>
            <p id = "outerLinks">
                <a target = "_blank" href = "https://www.facebook.com/">Facebook</a>
                <a target = "_blank" href = "https://www.appacademy.io/">App Academy </a>
            </p>
            <p>Technologies: Ruby Rails(Ruby on Rails) PostgreSql JavaScript React.js Redux.js AWS(S3) HTML5 CSS3  </p>
            <p>Kaiter Wu <i className="fa-regular fa-copyright"></i> 2023</p>

        </div>
        </div>
        </div>
        </>
    );
}

export default LoginFormPage