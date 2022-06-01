import { Link } from "react-router-dom";

const DeletedMsg = () => {


    return (
    <div className="deleted-msg container" >
        <h1>Votre compte a bien été supprimé. Veuillez vous identifier avec un autre compte ou en créer un nouveau pour accéder au réseau Groupomania</h1>
        <Link aria-label='identification' to="/auth/login" className="btn" name="login">s'identifier</Link>
    </div>
    );
};

export default DeletedMsg;
