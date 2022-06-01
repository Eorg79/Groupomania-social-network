import React from "react";

 
const LoginButton = (props) => {
    
    const { showLoginFormHandler } = props;

    return <button aria-label='login' className='btn' onClick={showLoginFormHandler}>se connecter</button>

 };

 export default LoginButton;



 