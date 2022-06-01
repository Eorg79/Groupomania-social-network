import React from "react";
 
const AddUserButton = (props) => {
    
    const { showUserFormHandler } = props;

    return <button aria-label='créer un compte' className='btn' onClick={showUserFormHandler}>créer un compte</button>

 };

 export default AddUserButton;