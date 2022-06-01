import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComment from "./CardComment";
import NewComment from "../NewComment/NewComment";
import AddCommentButton from "../NewComment/AddCommentButton";

const Comments = (props) => {
    const [comments, setComments] = useState([]);
    const [showCommentForm, setShowCommentForm] = useState('hideCommentForm');
    const [newCommentsList, setNewCommentsList] = useState([]);
    
    const { postId } = props

    useEffect(() => {
        getComments();
    }, []);
    
    const getComments = () => {
        axios.get('http://localhost:3000/api/comments/' + postId)
        .then((res)=> setComments(res.data.comments));
    };

    const showCommentFormHandler = (event) => {
        event.preventDefault();
        setShowCommentForm('showCommentForm');
    };
    
    const addCommentHandler = comment => {
        axios.post('http://localhost:3000/api/comments/' + postId, {
          content: comment.content
        })
        //.then((res)=> console.log(res.data));
        
        .then(() => {
          setNewCommentsList((prevCommentsList) => {return [...prevCommentsList, {comment}];
          });
          getComments();
        });
      };
    
    const deleteCommentHandler = (key) => {
        const updatedComments = comments.filter((comment) => comment.commentId !== key);
        const commentId = key;
        axios.delete('http://localhost:3000/api/comments/' + commentId)
        .then((res)=>{
            console.log(res.data);
            setComments(updatedComments);       
            }); 
      };
    
    return (
        
        <div className="comments">
            <ul className="comments-list">
                {comments.map((comment) => (
                  <CardComment comment={comment} key={comment.commentId} onDeleteComment={deleteCommentHandler} />
                ))}
            </ul>
            <div>
                {showCommentForm === 'hideCommentForm' && <AddCommentButton showCommentFormHandler={ showCommentFormHandler } postId={postId} className="add-comment-btn" />}
                {showCommentForm === 'showCommentForm' && <NewComment newcomment={newCommentsList} onAddComment={addCommentHandler} postId={postId} />}
            </div>
        </div>
    );
};

export default Comments;
