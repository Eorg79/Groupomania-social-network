import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
import { AuthErrorContext } from '../utils/AuthErrorContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from '../utils/TextError';
/*
import UpdateAvatarForm from '../components/user/UpdateAvatarForm';
import UpdateImgButton from '../components/user/UpdateImgButton';
import DeleteUserButton from '../components/user/DeleteUserButton';*/
import DeletedMsg from '../components/UserProfile/DeletedMsg';


const Profile = (props) => {

  const { authStatus, setAuthStatus } = useContext(AuthContext);
  const [isEditingprofileData, setIsEditingProfileData] = useState(false);
  //const [showUpdateImgButton, setShowUpdateImgButton] = useState(true);
  const { authError, setAuthError } = useContext(AuthErrorContext);
  const [showSignupSuccessFeedback, setShowSignupSuccessFeedback] = useState(false);

  const editingHandler = (event) => {
    setIsEditingProfileData(true);
  };

 /*const ShowUpdateImgButtonHandler = (event) => {
    setShowUpdateImgButton(false);
  };
  */
  const initialValues = {
    firstname: authStatus.firstname,
    name: authStatus.name,
    position: authStatus.position
    };

  const validationSchema = Yup.object({
    firstname: Yup.string().min(3, '3 caractères minimum').max(50, '50 caractères maximum').required('ce champ doit être complété'),
    name: Yup.string().min(3, '3 caractères minimum').max(50, '50 caractères maximum').required('ce champ doit être complété'),
    position: Yup.string().min(3, '3 caractères minimum').max(50, '50 caractères maximum').required('Ce champ doit être complété')
  });    
  

  const onSubmit =  (enteredUserData, onSubmitProps) => {
    const reset = () => {
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
        onSubmitProps.validateForm();
     }
    
    console.log('Form data', enteredUserData);
    axios.put('http://localhost:3000/api/auth/info', enteredUserData)

    .then((res)=> {
        setShowSignupSuccessFeedback(true);
        reset();      
    })
    
    
    .catch(error => {
        if(error.response) {
            console.log(error.response.data);
            setAuthError({...authError, 
                signupError: true,
                signupErrorMessage: "Echec de création du profil utilisateur, veuillez réessayer",
            });
        } else {
            (alert('Erreur de connexion au serveur'))
        };// à transformer en modale ou container à affichage conditionnel                                    
       reset();
    })
};

  /*const imageChangeHandler = (event) => {
    setEditedUserImage(URL.createObjectURL(event.target.files[0]));
    setEditedFile(event.target.files[0]);
    };

  const handleInfoUpdate = (event) => {
    if (firstnameIsValid === true && nameIsValid === true && positionIsValid === true) {

    try {

      const user = {
      //avec ternaire pour tester qu'entrée saisie, sinon affecte la valeur initiale pour ne pas ecraser données dans la BDD
      firstName: editedFirstname ? editedFirstname : authStatus.firstname,
      name: editedName ? editedName : authStatus.name,
      position: editedPosition ? editedPosition : authStatus.position,
      }
      axios.put('http://localhost:3000/api/auth/info', user)
      .then((res)=>{
      console.log(res.data);
      alert("données mises à jour");
      setIsEditingProfileData(false);
      setAuthStatus({...authStatus, firstname: user.firstName, name:user.name, position:user.position})
      setFirstnameIsValid();
      setNameIsValid();
      setPositionIsValid();
      setEmailIsValid();
      setFieldIsTouched({});
    
      });

      } catch(err) {
        alert("Echec de saisine des données, veuillez réessayer");

      }

    } else {
      alert("Echec de saisine des données, veuillez réessayer ");
    }

  };

  const deleteUserHandler = (event) => {
    const userId = authStatus.userId;
    axios.delete('http://localhost:3000/api/auth/' + userId)
    .then((res)=>{
        console.log(res.data);
        setAuthStatus({firstname:"", name:"", position:"", avatar:"", userId:"", role:"", status: false, deletedAccount: true, signedupSuccess:false});
        
    });
  };
*/

    return (
    <>
    {authStatus.deletedAccount === true && 
    <DeletedMsg className="deleted container" />}
    
    {authStatus.deletedAccount === false && 
    <div className="profil container">
    <h1 className="user-name">Mon profil</h1>
    {isEditingprofileData ? 
      (<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false} validateOnMount={true}>        
            {
                formik => {
                    console.log('Formik props', formik)
                    return(
                        <Form className="form-container" >          
                        <div className="form-control">
                            <label htmlFor="firstname">prénom</label>
                            <Field autofocus type="text" id="firstname" name="firstname" placeholder="votre prénom"/>
                            <ErrorMessage name="firstname" component={TextError} />
                        </div>
        
                        <div className="form-control">
                            <label htmlFor="name">nom</label>
                            <Field type="text" id="name" name="name" placeholder="votre nom" />
                            <ErrorMessage name="name" component={TextError} />
                        </div>
         
                        <div className="form-control">
                            <label htmlFor="position">fonction</label>
                            <Field type="text" id="position" name="position" placeholder="votre fonction" />
                            <ErrorMessage name="position" component={TextError} />
                        </div>

                        <button className="btn" type="submit" disabled={!formik.isValid || formik.isSubmitting}>valider les modifications</button>           
                    </Form> 
                    )
                }}     
        </Formik>)
        :
        (<div className="profile-data">
            <p>prénom: {authStatus.firstname}</p>
            <p>nom: {authStatus.name}</p> 
            <p>fonction: {authStatus.position}</p>
            <button className="btn" onClick={editingHandler}>éditer mes infos</button>
          </div>) }  
    </div>}
    </>    
      

    );
    
  };
  
  export default Profile;


  /* 
 
        <div className='profil__data-container'>
          <div className='user-img-container'>
           <img className="user-img" src={authStatus.avatar}/>
          </div>
        </div>
      </div>
          <DeleteUserButton deleteUserHandler={deleteUserHandler} />
    </div>
}


  //{isEditingprofileImg? (<UpdateAvatarForm className="updateAvatar-form" />) : (<img className="user-img" src={authStatus.avatar}/>)}
//<button className='btn' onClick={deleteUserPhotoHandler} >supprimer ma photo</button>
  //showUpdateAvatarFormHandler= {showUpdateAvatarFormHandler}
  
  const deleteUserPhotoHandler = (event) => {
    const userId = authStatus.userId;
    axios.delete('http://localhost:3000/api/auth/photo' + userId)
    .then((res)=>{
        console.log(res.data);
        setAuthStatus({...authStatus, avatar:""})
    });
  };
  <div className='profil__data-container'>
          <div className='user-img-container'>
            {showUpdateImgButton ? (<img className="user-img" src={authStatus.avatar}/>) : null }
          </div>
          <div className="profil__btn-container">
            {showUpdateImgButton === true && <UpdateImgButton ShowUpdateImgButtonHandler={ShowUpdateImgButtonHandler} />}
            {showUpdateImgButton === false && <UpdateAvatarForm ShowUpdateImgButtonHandler={ShowUpdateImgButtonHandler}/>}     
          </div>
        </div>
  */

