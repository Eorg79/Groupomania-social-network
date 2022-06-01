import { Link } from "react-router-dom";

const RequestFailedMsg = () => {

    return (
    <div className="request-failed-msg container" >
        <h1>Oups, il s'est produit une erreur. Groupomania est inaccessible, veuillez réessayer ultérieurement</h1>
    </div>
    );
};

export default RequestFailedMsg;
