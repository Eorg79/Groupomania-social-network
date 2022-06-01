import React, { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import dayjs from 'dayjs';

const CardComment = (props) => {
    const { authStatus } = useContext(AuthContext);

    console.log(props);
    const { comment, onDeleteComment } = props;

    
    return (
        <li className="card">
            <div className="card-data">
            <p className='created-at'>Posté le {dayjs(comment.insertionDate).format("DD/MM/YYYY à HH:mm")}</p>
                <div className="author-info-box">
                    <div>par:</div>
                    <div className="avatar-container">
                        <img className="avatar-img" src={comment.avatar} />
                    </div>
                    <div className="user-infos-container">
                        <div className="name-container">
                            <span className="user-firstname">{comment.firstname}</span>
                            <span className="user-name">{comment.name}</span>
                        </div>
                        <div className="user-position">{comment.position}</div> 
                    </div>
                </div>
                <p>{comment.content}</p>
                <div className="delete-btn-container">
                {(authStatus.role === 'admin' || authStatus.userId === comment.authorId) && <div className="small-delete-btn" onClick={() => { if (window.confirm("Veuillez confirmer la suppression du commentaire")) {onDeleteComment(comment.commentId)}}}><i className="fas fa-trash-alt"></i>supprimer</div>}    
                </div>
            </div>
        </li>
    );
};

export default CardComment;