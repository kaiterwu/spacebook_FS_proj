import React from 'react';
import {Redirect, Route,Switch} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import { useSelector } from 'react-redux';
import ReloginForm from './components/LoginFormPage/relogin';
import ProfilePage from './components/ProfilePage/index.js'
// import BenchIndexPage from './components/BenchIndexPage';

function App() {
  const loggedIn = useSelector(state=>state.session.user);
  let splashPage

  if (!loggedIn){
    splashPage = (
      <Redirect to = '/login'/>
    )
  }else{
    splashPage = (
      <>
    <Redirect to = '/'/>
    </>
    )

      
  }
  return (
    <>
    {/* <h1>Spacebook?</h1> */}
    <Navigation/>
    <Switch>
    <Route exact path ='/'>
    SPLASH PAGE
      {splashPage}
    </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path='/relogin'>
        <ReloginForm/>
      </Route>
      <Route path = '/users/:userId' component = {ProfilePage}/>
    </Switch>
    </>

  );
}

export default App;
