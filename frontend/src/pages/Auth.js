import React, { useState, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { AuthErrorContext } from '../utils/AuthErrorContext';
import LoginForm from '../components/Login/LoginForm';
import LoginButton from '../components/Login/LoginButton';
import AddUserButton from '../components/Signup/AddUserButton';
import NewUserForm from '../components/Signup/NewUserForm';
import AuthModalBox from '../utils/AuthModalBox/AuthModalBox';

const Auth = (props) => {
  const { authStatus } = useContext(AuthContext);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [authError, setAuthError] = useState({
    emailLoginError: false,
    emailLoginMessage: "",
    passwordLoginError: false,
    passwordLoginMessage:"",
    signupError: false,
    signupErrorMessage: "",
    LoginRequestFailed: false,
    LoginFailureMessage: "",
  });
  
  const showUserFormHandler = (event) => {
    event.preventDefault();
    setShowUserForm(true);
    setShowLoginForm(false);
  };

  const showLoginFormHandler = (event) => {
    event.preventDefault();
    setShowLoginForm(true);
    setShowUserForm(false);
  };

    return (
     
      <AuthErrorContext.Provider value={{ authError, setAuthError }}>
        {authStatus.status === false &&
          <div className='auth container'>
            <h1>Rejoignez la communauté Groupomania</h1>
            {showLoginForm === true && <LoginForm />}
              <div className='add-user'>
                {showUserForm === false && <AddUserButton showUserFormHandler={ showUserFormHandler } className="add-user btn" />}
                {showUserForm === true && 
                  <>
                    <NewUserForm showUserFormHandler={ showUserFormHandler } />
                    <LoginButton showLoginFormHandler={ showLoginFormHandler }/>
                  </>
                  }   
              </div>
            </div>
        }  
        {authError.signupError && <AuthModalBox />}
        {authError.emailLoginError && <AuthModalBox message={authError.emailLoginMessage}/>}
        {authError.passwordLoginError && <AuthModalBox message={authError.passwordLoginMessage}/>}
        {authError.LoginRequestFailed && <AuthModalBox message={authError.LoginFailureMessage}/>}
      </AuthErrorContext.Provider>  
    );
  }
  
  export default Auth;