import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { AuthErrorContext } from '../AuthErrorContext';

const AuthModalBox = (props) => {
    const { authError, setAuthError } = useContext(AuthErrorContext);

    const [modalIsOpen, setModalIsOpen] = useState(true);
    const closeModal = () => {
        setModalIsOpen(false);
        setAuthError({...authError, //reviser fonctionnement et syntaxe spread avec useState
            emailLoginError: false,
            emailLoginMessage: "",
            passwordLoginError: false,
            passwordLoginMessage:"",
            signupError: false,
            signupErrorMessage:"",
            LoginRequestFailed: false,
            LoginFailureMessage: "",
        });
    };


    return ReactDOM.createPortal( 
        <Modal className="modal container" isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={closeModal}>
            <div className="modal content">
                <h3>{props.message}</h3>
            </div>
            <div className="modal btn-container">
                <button className="btn" onClick={closeModal}>fermer</button>
            </div>
        </Modal>,
        document.querySelector('#modal')
     );
};

export default AuthModalBox;