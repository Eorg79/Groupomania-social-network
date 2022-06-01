import React from "react"
import { AuthContext } from '../utils/AuthContext';


const PostAvatar = () => {
    const { authStatus, setAuthStatus } = useContext(AuthContext);

return (
<div className="author-info-box">
    <div className="avatar-container">
        <img className="avatar-img" src={authStatus.image} />
    </div>
    <div className="user-infos-container">
        <div className="name-container">
            <span className="user-firstname">{authStatus.firstname}</span>
            <span className="user-name">{authStatus.name}</span>
        </div>
    <div className="user-position">{authStatus.position}</div> 
    </div>
</div>
    )
};

export default PostAvatar;