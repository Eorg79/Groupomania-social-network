import { Link } from "react-router-dom";

const NotLoggedHome = () => {


    return (
    <>
        <h1>Vous devez être identifié pour accéder au réseau Groupomania</h1>
        <Link to="/auth/login" className="btn" name="login">s'identifier</Link>
    </>
    );
};

export default NotLoggedHome;
