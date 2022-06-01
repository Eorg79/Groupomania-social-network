import React, { useContext, useState } from "react";
import { AuthErrorContext } from "../../utils/AuthErrorContext";
//import { Link } from "react-router-dom";
import AddUserButton from "./AddUserButton";

const SignupFeedback = () => {
    const { authError } = useContext(AuthErrorContext);
    
    const showUserFormHandler = (event) => {
        event.preventDefault();
        //setShowUserForm('showUserForm');
      };
    //const [click, setClick] = useState(false);

    /*const handleClick = () => {
        setClick(!click);
    };
    
    <Link onClick={handleClick} to="/auth/login" className="btn" name="login">s'identifier</Link>*/
    
return (
    <>
            {authError.signupError ?
            (<div className='signup-error displayer'>
                <p>Le profil n'a pu être créé, merci de réessayer</p>
                <AddUserButton showUserFormHandler={ showUserFormHandler } className="add-user btn"/>
                </div>) : 
            (<div className='signup-success displayer'>
                <p>Profil créé avec succès, vous pouvez désormais vous identifier pour accéder au réseau Groupomania</p>          
            </div>
            )}
    </>
    )
};
export default SignupFeedback;