import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import './index.css';
import App from './App';
import * as sessionActions from './store/session'
import * as userActions from './store/users'
import * as postActions from './store/posts'
import * as commentActions from './store/comments'
import csrfFetch from './store/csrf';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import './index.css'

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions
  // window.benchActions = benchActions;
  window.userActions = userActions
  window.postActions = postActions
  window.commentActions = commentActions
}

function Root() {
  return (
    <ModalProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    </ModalProvider>
  );
}

const renderApplication = () => {
  
  ReactDOM.render(
    <React.StrictMode>
      <Root/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (sessionStorage.getItem("X-CSRF-Token") === null||
    sessionStorage.getItem('currentUser') === null) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}
