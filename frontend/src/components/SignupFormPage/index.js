import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

// import './SignupForm.css';

function SignupFormPage(){
    const currentDay = new Date()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [birthday,setBirthday] = useState('dummy')
    const [month,setMonth] = useState(currentDay.getMonth().toString())
    const [day,setDay] = useState(currentDay.getDate().toString())
    const [year,setYear] = useState(currentDay.getFullYear().toString())
    const [gender,setGender] = useState('')
    const [errors,setErrors] = useState([]);

    const months = {'Jan':1,'Feb':2,'Mar':3,'Apr':4,'May':5,'Jun':6,
    'Jul':7,'Aug':8,'Sep':9,'Oct':10,'Nov':11,'Dec':12}

    const monthsArr = Object.keys(months)

    const days = Array.from({length:31},(x,i)=>i+1);

    const years = Array.from({length:100},(x,i)=>i+currentDay.getFullYear()-99);




    if (sessionUser) return <Redirect to="/"/>;

    const handleSubmit = (e) =>{
        e.preventDefault();
             setErrors([]);
             dispatch(sessionActions.signup({firstName,lastName,email,password,birthday,gender}))
             .catch(async(res)=>{
                 const data = await res.json();
                 if (data.errors) setErrors(data.errors);
                 debugger
             });
    };

    return(
        <form className = 'signup' onSubmit = {handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
                <div>
                <input type = "text" value = {firstName} onChange = {(e)=>setFirstName(e.target.value)}
                placeholder = 'First name'required/>

                <input type = "text" value = {lastName} onChange = {(e)=>setLastName(e.target.value)}
                placeholder = 'Last name'required/>

                </div>
                <input type = "text" value = {email} onChange = {(e)=>setEmail(e.target.value)}
                placeholder = 'Email'required/>
           
                <input type = "password" value = {password} onChange = {(e)=>setPassword(e.target.value)}
                placeholder = 'Password'required/>
                <div className = 'birthday_data' name = 'birthday'>
                <label htmlFor = 'birthday'>Birthday</label>
                    <div>
                        <select id="month" defaultValue = {monthsArr[month]}
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

                
           
            
            

            <button type = "submit" onClick={()=>setBirthday(`${year}-${month}-${day}`)}>Sign Up</button>
        </form>
    );
}   

export default SignupFormPage
