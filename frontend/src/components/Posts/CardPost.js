import React, { useState, useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import Comments from '../Comments/CommentsList';
import DisplayCommentsButton from '../Comments/DisplayCommentsButton';
import dayjs from 'dayjs';
import LikesCounter from '../Likes/LikesCounter';


const CardPost = (props) => {
    const { authStatus } = useContext(AuthContext); 
    const { post, onDelete } = props;
    const [displayComments, setDisplayComments] = useState('hideComments');
    
    const commentsHandler = (event) => {
        event.preventDefault();
        setDisplayComments('showComments');
    };
    

    return (
        <li className="card">
            <div className="card-data"> 
                <div className="author-info-box">
                    <div>De:</div>
                    <div className="avatar-container">
                        <img className="avatar-img" src={post.avatar} />
                    </div>
                    <div className="user-infos-container">
                        <div className="name-container">
                            <span className="user-firstname">{post.firstname}</span>
                            <span className="user-name">{post.name}</span>
                        </div>
                        <div className="user-position">{post.position}</div> 
                    </div>
                </div>
                <p className='created-at'>Posté le {dayjs(post.insertionDate).format("DD/MM/YYYY à HH:mm")}</p>
                <p>{post.message}</p>
                <div className="post-img-wrapper">
                    <img className="post-img" src={post.image} alt=""/>
                </div>
                <div className="card-btn-container">
                    <div className="comments-displayer">
                        {displayComments === 'hideComments' && <DisplayCommentsButton aria-label='afficher commentaires' commentsHandler={ commentsHandler } commentsNumber={post.commentsNumber} postId={post.postId} className="display-comment-btn small-btn" />}
                        {displayComments === 'showComments' && <Comments postId={post.postId} />}
                    </div>
                    <LikesCounter />
                    <div className="delete-btn-wrapper">
                        {
                        (authStatus.role === 'admin' || authStatus.userId === post.authorId)
                        && <div aria-label='supprimer le post' className='small-delete-btn' onClick={() => { if (window.confirm("Veuillez confirmer la suppression du post")) {onDelete(post.postId)}}}><i className="fas fa-trash-alt"></i>supprimer</div>
                        } 

                    </div>
                </div>
            </div>
        </li>
    );
};

export default CardPost;