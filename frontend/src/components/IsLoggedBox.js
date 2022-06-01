import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

const IsLoggedBox = () => {
    
    const { authStatus, setAuthStatus } = useContext(AuthContext);
    let navigate = useNavigate();

     const LogoutclickHandler = (event) => {
         event.preventDefault();
         localStorage.removeItem('token');
         setAuthStatus({
            firstname:"",
            name:"",
            position:"",
            avatar:"",
            id: 0,
            status: false,
         })
         //setIslogged('notlogged');
         navigate("/auth/login");
        };

    return (
        
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
                {authStatus.status && <Link aria-label='se deconnecter' to="/auth/logout" name="logout" onClick={LogoutclickHandler}> se deconnecter </Link>}
            </div>
        </div>

        );
    };
    
export default IsLoggedBox;