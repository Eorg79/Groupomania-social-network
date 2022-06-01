import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
import Validator  from "fastest-validator";
import UpdateAvatarForm from '../components/user/UpdateAvatarForm';
import UpdateImgButton from '../components/user/UpdateImgButton';
import DeleteUserButton from '../components/user/DeleteUserButton';
import DeletedMsg from '../components/user/DeletedMsg';
//import { AuthErrorContext } from '../utils/AuthErrorContext';

const Profile = (props) => {

  const { authStatus, setAuthStatus } = useContext(AuthContext);
  const [isEditingprofileData, setIsEditingProfileData] = useState(false);
  const [showUpdateImgButton, setShowUpdateImgButton] = useState(true);
  const [editedFirstname, setEditedFirstname] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedPosition, setEditedPosition] = useState('');
  const [editedUserImage, setEditedUserImage] = useState('');
  const [editedFile, setEditedFile] = useState('');
  const [firstnameIsValid, setFirstnameIsValid] = useState();
  const [nameIsValid, setNameIsValid] = useState();
  const [positionIsValid, setPositionIsValid] = useState();
  const [emailIsValid, setEmailIsValid] = useState();
  const [fieldIsTouched, setFieldIsTouched] = useState({});

  const editingHandler = (event) => {
    setIsEditingProfileData(true);
  };

 const ShowUpdateImgButtonHandler = (event) => {
    setShowUpdateImgButton(false);
  };

  const firstnameChangeHandler = (event) => setEditedFirstname(event.target.value);
  const nameChangeHandler = (event) => setEditedName(event.target.value);
  const positionChangeHandler = (event) => setEditedPosition(event.target.value);
  
  /*const imageChangeHandler = (event) => {
    setEditedUserImage(URL.createObjectURL(event.target.files[0]));
    setEditedFile(event.target.files[0]);
    };*/

  
    const firstnameBlurHandler = (event) => {
      const { name } = event.target;
      setFirstnameIsValid(false);
      const v = new Validator();
      const firstnameSchema = {editedFirstname: {type:"string", optional: false, min:"3", max: "50"},};
      let firstnameToValidate = {editedFirstname: editedFirstname.trim()};
      const firstnameValidationResponse = v.validate(firstnameToValidate, firstnameSchema);
      if (firstnameValidationResponse !== true) {
          return ({message:"format de données incorrect", errors: firstnameValidationResponse})
      } else {
          setFirstnameIsValid(true);
          setFieldIsTouched({...fieldIsTouched, [name]: true});
      }     
  };

  const nameBlurHandler = (event) => {
      const { name } = event.target;
      setNameIsValid(false);
      const v = new Validator();
      const nameSchema = {editedName: {type:"string", optional: false, min:"3", max: "50"},};
      let nameToValidate = {editedName: editedName.trim()};
      const nameValidationResponse = v.validate(nameToValidate, nameSchema);
      if (nameValidationResponse !== true) {
          return ({message:"format de données incorrect", errors: nameValidationResponse})
      } else {
          setNameIsValid(true);
          setFieldIsTouched({...fieldIsTouched, [name]: true});
      }
  };
  
  const positionBlurHandler = (event) => {
      const { name } = event.target;
      setPositionIsValid(false);
      const v = new Validator();
      const positionSchema = {editedPosition: {type:"string", optional: false, min:"3", max: "50"},};
      let positionToValidate = {editedPosition: editedPosition.trim()};
      const positionValidationResponse = v.validate(positionToValidate, positionSchema);
      if (positionValidationResponse !== true) {
          return ({message:"format de données incorrect", errors: positionValidationResponse})
      } else {
          setPositionIsValid(true);
          setFieldIsTouched({...fieldIsTouched, [name]: true});
      }
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

    return (
    <>
    {authStatus.deletedAccount === true && <DeletedMsg className="deleted container" />}

    {authStatus.deletedAccount === false && <div className="profil container">
      <div className='data-containers-wrapper'>
        <h1 className="user-name">Mon profil</h1>
        <div className="new-user__controls">
          {isEditingprofileData? 
            (<div className='new-user__control'><label>prénom<input name="firstname" type="text" label="prénom" autoFocus defaultValue={authStatus.firstname} onChange={firstnameChangeHandler} onBlur={firstnameBlurHandler}></input></label></div>)
            : (<p>prénom: {authStatus.firstname}</p>)}
          { (fieldIsTouched.firstname === true && firstnameIsValid === false) && <div className='firstname-error error-box'>Format incorrect, 3 à 50 caractères requis</div>}   
          {isEditingprofileData? 
            (<div className='new-user__control'><label>nom<input name="name" type="text" label="nom" autoFocus defaultValue={authStatus.name} onChange={nameChangeHandler} onBlur={nameBlurHandler}></input></label></div>)
             : (<p>nom: {authStatus.name}</p>)}
          { (fieldIsTouched.name === true && nameIsValid === false) && <div className='name-error error-box'>Format incorrect, 3 à 50 caractères requis</div>}   
          {isEditingprofileData?
            (<div className='new-user__control'><label>fonction<input name="position" type="text" label="fonction" autoFocus defaultValue={authStatus.position} onChange={positionChangeHandler} onBlur={positionBlurHandler}></input></label></div>)
             : (<p>fonction: {authStatus.position}</p>)}
          { (fieldIsTouched.position === true && positionIsValid === false) && <div className='position-error error-box'>Format incorrect, 3 à 50 caractères requis</div>}   
            </div>
          <div className="profil__btn-container">
          {isEditingprofileData?
               (<button className="btn" onClick={handleInfoUpdate}>Valider les modifications</button>)
                : (<button className="btn" onClick={editingHandler}>éditer mes infos</button>)}
          </div>
        <div className='profil__data-container'>
          <div className='user-img-container'>
           <img className="user-img" src={authStatus.avatar}/>
          </div>
        </div>
      </div>
          <DeleteUserButton deleteUserHandler={deleteUserHandler} />
    </div>
}
    </> 

    );
  }
  
  export default Profile;



  //{isEditingprofileImg? (<UpdateAvatarForm className="updateAvatar-form" />) : (<img className="user-img" src={authStatus.avatar}/>)}
//<button className='btn' onClick={deleteUserPhotoHandler} >supprimer ma photo</button>
  //showUpdateAvatarFormHandler= {showUpdateAvatarFormHandler}
  /*
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

