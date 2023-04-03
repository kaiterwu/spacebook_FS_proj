import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage(){
    const currentDay = new Date()
    const monthNow = (currentDay.getMonth())
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [birthday,setBirthday] = useState('dummy')
    const [month,setMonth] = useState(monthNow+1)
    const [day,setDay] = useState(currentDay.getDate().toString())
    const [year,setYear] = useState(currentDay.getFullYear().toString())
    const [gender,setGender] = useState('')
    const [errors,setErrors] = useState([]);

    const months = {'Jan':1,'Feb':2,'Mar':3,'Apr':4,'May':5,'Jun':6,
    'Jul':7,'Aug':8,'Sep':9,'Oct':10,'Nov':11,'Dec':12}

    const monthsArr = Object.keys(months)

    const monthsThirty = [4,6,9,11]

    const days = Array.from({length:31},(x,i)=>i+1);

    const years = Array.from({length:100},(x,i)=>i+currentDay.getFullYear()-99);


    if (sessionUser) return <Redirect to="/"/>;

    const handleSubmit = (e) =>{
        setErrors([]);
        e.preventDefault();
        if (monthsThirty.includes(month)){
            if (parseInt(day)>30) return setErrors(['Invalid Date'])
        }else if (month === 2){
            if(parseInt(year)%4 === 0){
                if (parseInt(day)>29) return setErrors(['Invalid Date'])
            }else{
                if (parseInt(day)>28) return setErrors(['Invalid Date'])
            }
        
        }
        if(parseInt(year) > currentDay.getFullYear()-13){
            return setErrors(['Does not meet age requirement'])}
        if(parseInt(year) === currentDay.getFullYear()-13){
            if (month > (currentDay.getMonth()+1)){ 
                return setErrors(['Does not meet age requirement'])
            }else if (month === (currentDay.getMonth()+1)){
                if (parseInt(day)>currentDay.getDate()) return setErrors(['Does not meet age requirement'])
            }
        } 
            dispatch(sessionActions.signup({firstName,lastName,email,password,birthday,gender}))
            .catch(async(res)=>{
                const data = await res.json();
                if (data.errors) setErrors(data.errors);
            
            });
            dispatch(sessionActions.login({email:email,password:password}))
     
        }

        
    

    return(
        <>
        <div className = 'signupWindow'>

        <div className="signupHeaders">
            <div id = 'bigSign'>Sign up</div>
            <div id = 'smallsign'>It's quick and easy.</div>
        </div>
        <form className = 'signup' onSubmit = {handleSubmit}>
            <ul className= 'signupErrors'>
                {errors.map(error => <li key={error}>▲{error}</li>)}
            </ul>
                <div className="names">
                <input type = "text" value = {firstName} onChange = {(e)=>setFirstName(e.target.value)}
                placeholder = 'First name'required/>

                <input type = "text" value = {lastName} onChange = {(e)=>setLastName(e.target.value)}
                placeholder = 'Last name'required/>

                </div>
                <input type = "text" value = {email} onChange = {(e)=>setEmail(e.target.value)}
                placeholder = 'Email'required id = 'emailInput'/>
           
                <input type = "password" value = {password} onChange = {(e)=>setPassword(e.target.value)}
                placeholder = 'New Password'required id = 'passInput'/>

                <label id ='bday' htmlFor = 'birthday'>Birthday</label>
                <div className = 'birthday_data' name = 'birthday'>
                    <div>
                        <select id="month" defaultValue = {monthsArr[monthNow]}
                        onChange= {(e)=>setMonth(monthsArr.indexOf(e.target.value)+1)} >
                            {monthsArr.map(displayMonth=>
                                <option key = {displayMonth}>{displayMonth}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <select id="day" defaultValue = {day}
                        onChange = {(e)=>setDay(e.target.value)}>
                            {days.map(displayDay=>
                                    <option key = {displayDay}>{displayDay}</option>
                                )}
                        </select>
                    </div>
                        <select id="year" defaultValue = {year}
                        onChange = {(e)=>setYear(e.target.value)}>
                            {years.map(displayYear=>
                                  <option key = {displayYear}>{displayYear}</option>
                                )}
                        </select>
                            
                </div>
                <label id ='gend' htmlFor="gender">Gender</label>
                <div className = 'gender_data'>
                    <label>
                        Male
                        <input type = 'radio' name = 'gender'value = {'male'} 
                         onChange={(e)=>setGender(e.target.value)}/>
                    </label>
                    <label>
                        Female
                        <input type = 'radio' name = 'gender' value = {'female'}
                        onChange={(e)=>setGender(e.target.value)}/>
                    </label>
                    <label>
                        Custom
                        <input type = 'radio' name = 'gender' value = {'custom'}
                        onChange={(e)=>setGender(e.target.value)}/>
                    </label>
                </div>
            <button type = "submit" onClick={()=>setBirthday(`${year}-${month}-${day}`)}>Sign Up</button>
        </form>
        </div>
        </>
    );
}   

export default SignupFormPage
