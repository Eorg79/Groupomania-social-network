import React from "react";
 
const DeleteUserButton = (props) => {
    
    const { deleteUserHandler } = props;

    return <button aria-label='supprimer le compte' className='btn' onClick={deleteUserHandler}>supprimer le compte</button>

 };

 export default DeleteUserButton;