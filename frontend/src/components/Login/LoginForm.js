import React, { useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import { AuthErrorContext } from "../../utils/AuthErrorContext";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import TextError from "../../utils/TextError";
YupPassword(Yup);

const LoginForm = (props) => {
    const { authError, setAuthError } = useContext(AuthErrorContext);
    const { authStatus, setAuthStatus } = useContext(AuthContext);
    let navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    };
    
    const validationSchema = Yup.object({
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
        axios.post('http://localhost:3000/api/auth/login', enteredUserData)
    
        .then((res)=> {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            setAuthStatus({
                firstname: res.data.userdata.firstname,
                name: res.data.userdata.name,
                position: res.data.userdata.position,
                avatar: res.data.userdata.avatar,
                userId: res.data.userdata.userId,
                role: res.data.userdata.role,
                status: true,
                deletedAccount :false,
            });
            navigate('/');
            reset();      
        })

        .catch(error => {
            //console.log(error.message);
            //console.log(error.response.data);

            if (error.message) {
                setAuthError({...authError,
                    LoginRequestFailed: true,
                    LoginFailureMessage: "Votre requête n'a pas pu aboutir",
                    });
                reset();
            }
            
            if (error.response.data.emailError) {
                setAuthError({...authError, 
                  emailLoginError: true,
                  emailLoginMessage: "Utilisateur non trouvé",
                });
              }

            if (error.response.data.passwordError) {
                setAuthError({...authError,
                  passwordLoginError: true,
                  passwordLoginMessage: "Mot de passe incorrect",
                });
    
            } 

           reset();
        })
    };

    return (

    <Formik className='login-form form' initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false} validateOnMount={true}>
        {
            formik => {
                console.log('Formik props', formik)
                    return(
                <Form className="form-container">  
                    <div className='form-control'>
                        <label htmlFor="email">email</label>
                        <Field aria-label="email" type="email" id="email" name="email" placeholder="votre email"/>   
                        <ErrorMessage name="email" component={TextError} />
                    </div>
                                         
                    <div className='form-control'>
                        <label htmlFor="password">mot de passe</label>
                        <Field aria-label="password" type="password" id="password" name="password" placeholder="mot de passe" />
                        <ErrorMessage name="password" component={TextError} />
                    </div>
                                      
                    <button aria-label="connexion" className='btn' type="submit" disabled={!formik.isValid || formik.isSubmitting}>se connecter</button>
                </Form>
                    )
            }}
    </Formik>
    )
};
export default LoginForm;