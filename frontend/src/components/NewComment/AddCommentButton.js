import React from "react";
 
const AddCommentButton = (props) => {
    
    const { postId, showCommentFormHandler } = props;

    return <button className="comment-btn small-btn" onClick={showCommentFormHandler} postId= {postId}>commenter</button>

 };

 export default AddCommentButton;