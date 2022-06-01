import React, { useState } from "react";
import Validator  from "fastest-validator";

const CommentForm = (props) => {
    const [enteredComment, setEnteredComment] = useState('');
    const [commentIsValid, setCommentIsValid] = useState();
    const [fieldIsTouched, setFieldIsTouched] = useState({});

    const commentChangeHandler = (event) => {
        const { name } = event.target;
        setEnteredComment(event.target.value);
        setFieldIsTouched({...fieldIsTouched, [name]: true});
    };

    const commentBlurHandler = (event) => {
        const { name } = event.target;
        setCommentIsValid(false);
        const v = new Validator();
        const commentSchema = {enteredComment: {type:"string", optional: false, min:"3", max: "50"},};
        let commentToValidate = {enteredComment: enteredComment};
        const commentValidationResponse = v.validate(commentToValidate, commentSchema);
        if (commentValidationResponse !== true) {
            return ({message:"format de données incorrect", errors: commentValidationResponse})
        } else {
            setCommentIsValid(true);
            setFieldIsTouched({...fieldIsTouched, [name]: true});
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        
        if (commentIsValid === true) {
        
            try {
                const commentData = {content: enteredComment.trim()};
                props.onSaveCommentData(commentData);
        
            } catch(err) {
                alert("Echec de saisine du commentaire, veuillez réessayer");
            }
    
        } else {
        alert("Echec de saisine du commentaire, veuillez réessayer ");
        }
        //pour vider les inputs après le submit ou l'alerte
        setEnteredComment('');
        setCommentIsValid();
        setFieldIsTouched({});
    };

    return <form onSubmit={submitHandler}>
        <div className='new-comment__controls'>
            <div className='new-comment__control'>
                <label>votre commentaire
                <input aria-label="commentaire" aria-required='true' type='text' value={enteredComment} onChange={commentChangeHandler} onBlur={commentBlurHandler} required/>
                { commentIsValid === false && <div className='comment-error error-box'>Format incorrect, 3 à 500 caractères requis</div>}
                </label>
            </div>
        </div>
        <div className='new-comment__actions'>
            <button aria-label='publier commentaire' className="small-btn" type="submit">Publier</button>
        </div>
    </form>
};

export default CommentForm;