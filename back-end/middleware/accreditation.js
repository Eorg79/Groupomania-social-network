//exportation d'une fonction de middleware pour valider le role du user lors d'une requête
// monter le middleware sur la route avec les roles authorisés en paramètres : ,accreditation(['admin', 'user', 'moderateur']),
module.exports = (accreditations) => {
    return (req, res, next) => {
        const userRole = req.userRole
        if (accreditations.includes(userRole)) {
            next()
        } else {
            return res.status(401).json('Non autorisé!')
        }
    }
};

