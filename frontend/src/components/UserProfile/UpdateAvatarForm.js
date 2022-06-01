import React from "react";

const UpdateAvatarForm = (props) => {

        const imageChangeHandler = (event) => {
            URL.createObjectURL(event.target.files[0]);
        //setFile(event.target.files[0]);
        };

        const submitHandler = (event) => {
            event.preventDefault();  
            const UserImage = new FormData();
            const file = event.target.files[0];
            if (file) {
                UserImage.append('image', file);
            // Affichage des paires clefs/valeurs du FormData
                for(let pair of UserImage.entries()) {
                console.log(pair[0]+ ', '+ pair[1]);
                }
                props.onSaveUserImage(UserImage);
            } else {
                console.log('Aucune image chargée')
            }
        };
 //<img src={EnteredUserImage} alt="" />
    return (
        <form className="update-avatar-form" onSubmit={submitHandler}>        
            <input type='file' id='file-upload' name='file' accept='.jpg, .jpeg, .png, .gif' onChange={(e) => imageChangeHandler(e)} />
            <button type="submit">Valider</button>
        </form>
    )
};

export default UpdateAvatarForm;