import React, { useContext, useState } from "react";
import axios from 'axios';
import { AuthErrorContext } from '../../utils/AuthErrorContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import TextError from '../../utils/TextError';
import LoginForm from "../Login/LoginForm";
YupPassword(Yup);

const NewUserForm = () => {
        const { authError, setAuthError } = useContext(AuthErrorContext);
        const [showSignupSuccessFeedback, setShowSignupSuccessFeedback] = useState(false);

        const initialValues = {
            firstname: '',
            name: '',
            position: '',
            email: '',
            password: ''
        };

        const validationSchema = Yup.object({
            firstname: Yup.string().min(3, '3 caractères minimum').max(50, '50 caractères maximum').required('ce champ doit être complété'),
            name: Yup.string().min(3, '3 caractères minimum').max(50, '50 caractères maximum').required('ce champ doit être complété'),
            position: Yup.string().min(3, '3 caractères minimum').max(50, '50 caractères maximum').required('Ce champ doit être complété'),
            email: Yup.string().email('Format email invalide').min(3, '3 caractères minimum').max(50, '50 caractères maximum').required('ce champ doit être complété'),
            password: Yup.string().min(6, '6 caractères minimum').max(100, '100 caractères maximum').minUppercase(1, '1 majuscule minimum').minLowercase(1, '1 minuscule minimum').required('ce champ doit être complété')
        });    
        
        const onSubmit =  (enteredUserData, onSubmitProps) => {
            const reset = () => {
                onSubmitProps.setSubmitting(false);
                onSubmitProps.resetForm();
                onSubmitProps.validateForm();
             }
            
            console.log('Form data', enteredUserData);
            axios.post('http://localhost:3000/api/auth/signup', enteredUserData)
        
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

    return (
        
    <>
        {showSignupSuccessFeedback === false &&
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false} validateOnMount={true}>        
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
                        
                        <div className="form-control">
                            <label htmlFor="email">email</label>
                            <Field type="email" id="email" name="email" placeholder="votre email"/>
                            <ErrorMessage name="email" component={TextError} />
                        </div>
        
                        <div className="form-control">
                            <label htmlFor="password">mot de passe</label>
                            <Field type="password" id="password" name="password" placeholder="choisissez un mot de passe" />
                            <ErrorMessage name="password" component={TextError} />
                        </div>
        
                        <button className="btn" type="submit" disabled={!formik.isValid || formik.isSubmitting}>envoyer</button>           
                    </Form> 
                    )
                }}     
        </Formik>
        }

        {showSignupSuccessFeedback === true && 
            <div className='signup-success-msg'>
                <h3>Profil créé avec succès, vous pouvez désormais vous identifier pour accéder au réseau Groupomania</h3>
                <LoginForm />      
            </div>
        }   
    </>

    );

};
export default NewUserForm;
