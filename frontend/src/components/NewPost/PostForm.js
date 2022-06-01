import React, { useState } from "react";
import Validator  from "fastest-validator";

const PostForm = (props) => {
    const [enteredMessage, setEnteredMessage] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [file, setFile] = useState('');
    const [messageIsValid, setMessageIsValid] = useState();
    const [fieldIsTouched, setFieldIsTouched] = useState({});
   
    const messageChangeHandler = (event) => {
        const { name } = event.target;
        setEnteredMessage(event.target.value); 
        setFieldIsTouched({...fieldIsTouched, [name]: true});
    };

    const imageChangeHandler = (event) => {
        setPostImage(URL.createObjectURL(event.target.files[0]));
        setFile(event.target.files[0]);
    };

    const messageBlurHandler = (event) => {
        const { name } = event.target;
        setMessageIsValid(false);
        const v = new Validator();
        const messageSchema = {enteredMessage: {type:"string", optional: false, min:"3", max: "500"},};
        let messageToValidate = {enteredMessage: enteredMessage.trim()};
        const messageValidationResponse = v.validate(messageToValidate, messageSchema);
        if (messageValidationResponse !== true) {
            return ({message:"format de données incorrect", errors: messageValidationResponse})
        } else {
            setMessageIsValid(true);
            setFieldIsTouched({...fieldIsTouched, [name]: true});
        }
    };


    const submitHandler = async (event) => {
        event.preventDefault();

        if (messageIsValid === true) {

            try {    
                const postData = new FormData();
                postData.append('message', enteredMessage);
                if (file) postData.append('image', file);  
                // Affichage des paires clefs/valeurs du FormData
                for(let pair of postData.entries()) {console.log(pair[0]+ ', '+ pair[1]);}           
                props.onSavePostData(postData);

            } catch(err) {
                alert("Echec de saisine du message, veuillez réessayer");
            }

        }  else {    
            alert("Echec de saisine du message, veuillez réessayer ");
        }
            //pour vider les inputs après le submit
            setEnteredMessage('');//two way binding
            setPostImage('');
            setFile('');
            setMessageIsValid();
            setFieldIsTouched({}); 
    };
    
    return (

    <div className="new-post__form">
    <h1>Bienvenue sur le réseau Groupomania</h1>
    <form className='new-post form' onSubmit={submitHandler}>
        <div className='new-post__controls'>
            <div className='new-post__control'>
                <label>votre message</label>
                <textarea aria-label="message" aria-required='true' name="message" type='text' value={enteredMessage} onChange={messageChangeHandler} onBlur={messageBlurHandler} required/>
                { messageIsValid === false && <div className='post-error error-box'>Format incorrect, 3 à 500 caractères requis</div>}
            </div>
            <div className='new-post__control'>   
                <div className="post-img-wrapper">
                    <img className="post-img" src={postImage} alt="" />
                </div>
                <input aria-label="fichier image" type='file' id='file-upload' name='file' accept='.jpg, .jpeg, .png, .gif' aria-required='false' onChange={(e) => imageChangeHandler(e)} />
            </div>
        </div>
        <div className='new-post__actions'>
            <button aria-label="publier" className='btn' type="submit">Publier</button>
        </div>
    </form>
    </div>

    );
};
export default PostForm;