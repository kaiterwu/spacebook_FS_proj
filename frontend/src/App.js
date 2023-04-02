import React from 'react';
import {Route,Switch} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
// import Navigation from './components/Navigation';
// import BenchIndexPage from './components/BenchIndexPage';

function App() {
  return (
    <>
    <h1>Spacebook?</h1>
    {/* <Navigation/> */}
    <Switch>
    {/* <Route exact path ='/'>
      <BenchIndexPage/>
    </Route> */}
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>
    </>

  );
}

export default App;
