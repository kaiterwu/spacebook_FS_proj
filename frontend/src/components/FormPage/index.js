import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams } from "react-router-dom";
// import { fetchUser,getUser } from "../../store/users";
import * as sessionActions from "../../store/session";
import { editUser } from "../../store/users";
// import { Redirect } from "react-router-dom";
import './SignupForm.css';


function SignupFormPage(props){
    let bigSign,smallSign,passInput,buttonText,defaultDay,defaultMonth,defaultYear

    const currentDay = new Date()
    const monthNow = (currentDay.getMonth())
    const dispatch = useDispatch()
    let sessionUser = useSelector(state => state.session.user)

    let firstNameHead;
    let lastNameHead;
    let emailHead;
    let aboutMeHead;
    if (sessionUser){
        firstNameHead = <div>First Name</div>
        lastNameHead = <div>Last Name</div>
        emailHead = <div>Email</div>
        aboutMeHead = <div>About me</div>
    }
    if (!sessionUser){
        sessionUser = {
            aboutMe: '',
            birthday:'',
            email: '',
            firstName: '',
            gender: '',
            lastName: ''
        }
    }
    const userDate = new Date(sessionUser.birthday)
    const birthMonth = userDate.getUTCMonth()
    const birthDay = userDate.getUTCDate().toString()
    const birthYear = userDate.getUTCFullYear().toString()
    const {userId} = useParams()
    const [firstName,setFirstName] = useState(sessionUser.firstName)
    const [lastName,setLastName] = useState(sessionUser.lastName)
    const [email,setEmail] = useState(sessionUser.email)
    const [password,setPassword] = useState("")
    const [aboutMe,setAboutMe] = useState(sessionUser.aboutMe)
    const [birthday,setBirthday] = useState('')



    const currentMonth = monthNow
    const currentDayDay = currentDay.getDate().toString()
    const currentYear = currentDay.getFullYear().toString()
    
    if (!userId){
        bigSign = 'Sign up'
        smallSign = "It's quick and easy."
        passInput = <input type = "password" value = {password} onChange = {(e)=>setPassword(e.target.value)}
        placeholder = 'New Password' id = 'passInput'/>
        buttonText = 'Sign Up'
        defaultDay = currentDayDay;
        defaultMonth = currentMonth;
        defaultYear = currentYear;
    }else{
        bigSign = 'Edit Profile'
        smallSign = "Customize your info"
        passInput =
        <div id ="aboutMeContain">
            {aboutMeHead}
            <textarea id = 'aboutMeText' value = {aboutMe} onChange = {(e)=>setAboutMe(e.target.value)} placeholder="Tell us about yourself"></textarea>

        </div>
        buttonText = 'Edit your Info'
        defaultDay = birthDay
        defaultMonth = birthMonth
        defaultYear = birthYear
    }
    
    
    
    

    const [month,setMonth] = useState(defaultMonth+1)
    const [day,setDay] = useState(defaultDay)
    const [year,setYear] = useState(defaultYear)
    const [gender,setGender] = useState(sessionUser.gender)
    const [errors,setErrors] = useState([]);
    
    const months = {'Jan':1,'Feb':2,'Mar':3,'Apr':4,'May':5,'Jun':6,
    'Jul':7,'Aug':8,'Sep':9,'Oct':10,'Nov':11,'Dec':12}
    
    const monthsArr = Object.keys(months)
    
    const monthsThirty = [4,6,9,11]
    
    const days = Array.from({length:31},(x,i)=>i+1);
    
    const years = Array.from({length:100},(x,i)=>i+currentDay.getUTCFullYear()-99);
    
    // let loggedIn = useSelector(state => state.session.user)
    // if (loggedIn && !userId){return <Redirect to="/"/>};
    // if(userId) return <Redirect to = {`/users/${userId}`}/>
    
    let maleChecked = '';
    let femaleChecked = '';
    let customChecked = '';
    
    if (gender === 'Male'){
        maleChecked = true
    }else if (gender === 'Female'){
        femaleChecked = true
    }else if (gender === 'Custom'){
        customChecked = true
    }
    

    const handleSubmit = (e) =>{
        setErrors([]);
        e.preventDefault();
        if (monthsThirty.includes(month)){
            if (parseInt(day)>30) return setErrors(['Invalid Date.'])
        }else if (month === 2){
            if(parseInt(year)%4 === 0){
                if (parseInt(day)>29) return setErrors(['Invalid Date.'])
            }else{
                if (parseInt(day)>28) return setErrors(['Invalid Date.'])
            }
        
        }
        if(parseInt(year) > currentDay.getUTCFullYear()-13){
            return setErrors(['Does not meet age requirement.'])}
        if(parseInt(year) === currentDay.getUTCFullYear()-13){
            if (month > (currentDay.getUTCMonth()+1)){ 
                return setErrors(['Does not meet age requirement.'])
            }else if (month === (currentDay.getUTCMonth()+1)){
                if (parseInt(day)>currentDay.getUTCDate()) return setErrors(['Does not meet age requirement.'])
            }
        } 
            if(!userId){
                dispatch(sessionActions.signup({firstName,lastName,email,password,birthday,gender,userId}))
                .catch(async(res)=>{
                    const data = await res.json();
                    if (data.errors) return setErrors(data.errors);
                
                });
                //  dispatch(sessionActions.login({email:email,password:password}))
                // if (loggedIn) history.push('/')
                

            }else{
                sessionUser = {...sessionUser,firstName,lastName,email,gender,birthday,aboutMe}
                dispatch(editUser(sessionUser)).then(()=>{props.setShowModal(false)})
                .catch(async(res)=>{
                    const data = await res.json();
                    if (data.errors) return setErrors(data.errors);
                   
                });
                // if (!errors===[]) return;
                
                // props.setShowModal(false)
            }
            
        }
        
        //headers
    return(
        <>
        <div className = 'signupWindow'>
            
        <div className="signupHeaders">
            <div id = 'bigSign'>{bigSign}</div>
            <div id = 'smallsign'>{smallSign}</div>
        </div>
        <form className = 'signup' onSubmit = {handleSubmit}>
            <ul className= 'signupErrors'>
                {errors.map(error => <li key={error}><i className="fa-solid fa-triangle-exclamation"></i> {error}</li>)}
            </ul>
                <div className="names">
                    <div id = 'firstnameHead'>
                        {firstNameHead}
                        <input type = "text" value = {firstName} onChange = {(e)=>setFirstName(e.target.value)}
                        placeholder = 'First name'/>
                    </div>
                    <div id = 'lastnameHead'>
                        {lastNameHead}
                        <input type = "text" value = {lastName} onChange = {(e)=>setLastName(e.target.value)}
                        placeholder = 'Last name'/>
                    </div>


                </div>
                <div id = "emailInputcontain">
                    {emailHead}
                    <input type = "text" value = {email} onChange = {(e)=>setEmail(e.target.value)}
                    placeholder = 'Email' id = 'emailInput'/>
                </div>
                {passInput}

                <label id ='bday' htmlFor = 'birthday'>Birthday</label>
                <div className = 'birthday_data' name = 'birthday'>
                    <div>
                        <select id="month" defaultValue = {monthsArr[defaultMonth]}
                        onChange= {(e)=>setMonth(monthsArr.indexOf(e.target.value)+1)} >
                            {monthsArr.map(displayMonth=>
                                <option key = {displayMonth}>{displayMonth}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <select id="day" defaultValue = {defaultDay}
                        onChange = {(e)=>setDay(e.target.value)}>
                            {days.map(displayDay=>
                                    <option key = {displayDay}>{displayDay}</option>
                                )}
                        </select>
                    </div>
                        <select id="year" defaultValue = {defaultYear}
                        onChange = {(e)=>setYear(e.target.value)}>
                            {years.map(displayYear=>
                                  <option key = {displayYear}>{displayYear}</option>
                                )}
                        </select>
                            
                </div>
                <label id ='gend' htmlFor="gender">Gender</label>
                <div className = 'gender_data'>
                    <label>
                        <div>Female</div>
                        <input type = 'radio' name = 'gender' value = {'Female'}
                        onChange={(e)=>setGender(e.target.value)} checked = {femaleChecked}/>
                    </label>
                    <label>
                        <div>Male</div>
                        <input type = 'radio' name = 'gender' value = {'Male'} 
                         onChange={(e)=>setGender(e.target.value)} checked = {maleChecked}/>
                    </label>
                    <label>
                        <div>Custom</div>
                        <input type = 'radio' name = 'gender' value = {'Custom'}
                        onChange={(e)=>setGender(e.target.value)} checked = {customChecked}/>
                    </label>
                </div>
            <button type = "submit" onClick={()=>setBirthday(`${year}-${month}-${day}`)}>{buttonText}</button>
        </form>
        </div>
        </>
    );
}   

export default SignupFormPage
