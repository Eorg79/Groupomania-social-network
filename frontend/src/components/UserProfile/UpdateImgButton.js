import React from "react";
 
const UpdateImgButton = (props) => {
    
    const { showUpdateImgFormHandler } = props;

    return <button onClick={showUpdateImgFormHandler}>modifier ma photo</button>

 };

 export default UpdateImgButton;