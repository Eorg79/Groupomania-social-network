import React from "react";
 
const DisplayCommentsButton = (props) => {
    
    const { commentsNumber, postId, commentsHandler } = props;

    return <button className="small-btn" onClick={commentsHandler} postId= {postId}>{ commentsNumber } commentaires</button>

 };

 export default DisplayCommentsButton;