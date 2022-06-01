import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

const Navbar = () => {

    const { authStatus, setAuthStatus } = useContext(AuthContext);
    let navigate = useNavigate();

     const LogoutclickHandler = (event) => {
         event.preventDefault();
         localStorage.removeItem('token');
         setAuthStatus(...authStatus,{
            firstname:"",
            name:"",
            position:"",
            avatar:"",
            id: 0,
            status: false,
            deletedAccount: false,
            signedupSuccess: false,
         })
         navigate("/auth/login");
        };
        

    return (
    <nav className="navbar">
        <div>
            {authStatus.status === false && <Link to="/auth/login" name="login">s'identifier</Link>}
        </div>
        <div>
             <Link to="/">Accueil</Link>
        </div>
       <div>
           <Link to="/profile/*">mon profil</Link>
       </div>    
        <div className="logged-container">
            {authStatus.status && <div className="logged-container__userdata">
                <div className="avatar-container">
                    <img className="avatar-img" src={authStatus.avatar} />
                </div>
                <div className="user-infos-container">
                        <div className="name-container">
                            <span className="user-firstname">{authStatus.firstname}</span>
                            <span className="user-name">{authStatus.name}</span>
                        </div>
                        <div className="user-position">{authStatus.position}
                    </div>
                </div>
            </div>}
            <div className="logout-link">
                {authStatus.status && <Link to="/auth/logout" name="logout" onClick={LogoutclickHandler}> se deconnecter </Link>}
            </div>
        </div>
        
    </nav>
    )
}

export default Navbar;
