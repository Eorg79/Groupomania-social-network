// importation du module bcrypt, pour hacher le mot de passe
const bcrypt = require('bcrypt');
// importation du module Json Web Token, pour générer un token d'identification
const jwt = require('jsonwebtoken');
// importation du module crypto js, pour crypter les emails des utilisateurs inscrits
const cryptojs = require('crypto-js');
//importation de la connexion et des requetes à la BDD
const db = require('../config/dbconfig');
// importation du module natif de gestion de fichiers node, 
const fs = require('fs');
// importation du module fastest-validator de validation des données
const Validator = require('fastest-validator');
// importation de password validator, pour exiger la création de MDP sécurisés
const passwordValidator = require("password-validator");
//const { default: Validator } = require('fastest-validator');



// configuration du schéma de validation des inputs, sauf le MDP,
    const v = new Validator();
    const inputsSchema = {
        firstname: {type:"string", optional: false, min:"3", max: "50"},
        name: {type:"string", optional: false, min:"3", max: "50"},
        position: {type:"string", optional: false, min:"3", max: "50"},
        email: {type:"email", optional: false, min:"3", max: "50"}
    };
    const updatedInputsSchema = {
        firstName: {type:"string", optional: false, min:"3", max: "50"},
        name: {type:"string", optional: false, min:"3", max: "50"},
        position: {type:"string", optional: false, min:"3", max: "50"},
    };

// configuration du schéma de validation du mot de passe 
    const passwordSchema = new passwordValidator();
    passwordSchema
    .is().min(6)                                    // Minimum length 6
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces();                           // Should not have spaces

// exportation d'une fonction asynchrone de creation d'un nouvel utilisateur
exports.signup = async (req, res, next)=> {
    
    try { 
        //console.log(req.body);
        const Email = cryptojs.HmacSHA512(req.body.email, `${process.env.MAIL_KEY}`).toString();
        bcrypt.hash(req.body.password, 10)
        // une fois la promesse résolue (email crypté et MDP haché), validation des données puis envoi à la BDD  
        .then(hash => { 
            const firstname = req.body.firstname;
            const name =  req.body.name;
            const position = req.body.position;
            const email =  Email;
            const password = hash;
            let image = null;
            let toValidate ={};
            
            // si fichier chargé, prend en valeur l'adresse du fichier image téléchargé, générée de façon dynamique (ajout HTTP//, hote serveur, sous chemin image et nom du fichier)
            if (req.file) {
                image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }
            
            //validation des data            
            toValidate = {firstname, name, position, email: req.body.email};
            //console.log(toValidate);
            const inputsValidationResponse = v.validate(toValidate, inputsSchema);
            if (inputsValidationResponse !== true) {
                return res.status(400).json({
                    message:"format de données incorrect",
                    errors: inputsValidationResponse
                });
            }
            
            //validation du password
            if (passwordSchema.validate(req.body.password)) {               
            } else {
                return res.status(400).json({error : 'format de mot de passe incorrect:'+ passwordSchema.validate(req.body.password, { list: true })})
            }

            const newUser = db.createUser(firstname, name, position, email, password, image)
            
            newUser
            .then(data => res.json({ userId: data}))
            .catch(signupError => res.status(400).json({ signupError }));
            
            })

    } catch(error){
        console.log(error);
        res.status(400).json({ signupError: 'Echec de creation du profil, merci de réessayer' })
    }
};

// exportation d'une fonction asynchrone de login d'un utilisateur inscrit
exports.login = async (req, res, next) => {
    // cryptage de l'email récupéré dans la requête, avec la même clé secrete que celle utilisée pour la création des users
    const ResearchedEmail = cryptojs.HmacSHA512(req.body.email, `${process.env.MAIL_KEY}`).toString();
    // recherche de cet email parmi les emails cryptés présents dans la BD
    const existingUser = db.findUser(ResearchedEmail);

    await existingUser
    .then(user => {
        // retourne erreur et message si user n'exixte pas dans la BD
        if (user === null || user.length == 0) {
            return res.status(401).json({ emailError: 'Utilisateur non trouvé !' });
        }
        //si user trouvé, crypte et compare le password de la requete avec le password crypté de l'user trouvé
        else { 
            //console.log(user[0]);
            const {password} = user[0];
            //console.log(password);
            bcrypt.compare(req.body.password, password)
            .then(valid => {
                // si le MDP ne match pas, retourne erreur et message
                   if (!valid) {
                       return res.status(401).json({ passwordError: 'Mot de passe incorrect !' });
                   }
                   const data = {id : user[0].userId, email :user[0].email, role: user[0].role };
                   //appel de la fonction sign, pour générer le token à partir du user id, mail et role retournés par la BDD
                   const newToken = jwt.sign(data, `${process.env.JWT_USER_KEY}`, { expiresIn : '6h'}); //si MDP OK, renvoi d'un user Id encodé grace au module JWT
                   //console.log(newToken);
                   const userData = {userId: user[0].userId, firstname: user[0].firstname, name:user[0].name, position: user[0].position, avatar: user[0].avatar, role: user[0].role}
                   res.status(200).json({token: newToken, userdata: userData});
                    
                })
            .catch(error => console.log(error))
        }
    
    })
    // retoune une erreur si echec lors de la recherche du user par son email dans la BD
    .catch(error => res.status(500).json({ error }));
  };

// exportation d'une fonction asynchrone de MAJ des infos profil d'un utilisateur
exports.updateUserInfo = async (req, res, next)=> {
    try { 

    const id = req.userId;
    const user = req.body;
    
    if (req.body) {

    //validation des data            
        console.log(user);
        const updatedInputsValidationResponse = v.validate(user, updatedInputsSchema);
        if (updatedInputsValidationResponse !== true) {
            return res.status(400).json({
                message:"format de données incorrect",
                errors: updatedInputsValidationResponse
            });
        }

    const updatedUserInfo = db.changeUserInfo(id, user);

    await updatedUserInfo
        .then(() => res.status(201).json({ message: 'Profil mis à jour !'}))
        // retourne une erreur si echec dans la sauvegarde des modifications
        .catch(error => res.status(400).json({ error }));
    
    }

    else {
        res.status(400).json ({ message: 'Requête invalide, mise à jour non effectuée !' });
    }    

    } catch(error){
        console.log(error);
        res.sendStatus(400);
    }
};


// exportation d'une fonction asynchrone de MAJ de la photo profil d'un utilisateur
exports.updateUserPhoto = async (req, res, next)=> {
    try { 

    const id = req.userId;
    let newImage = "";

    if (req.file) {
        // si fichier chargé, prend  en valeur l'adresse du fichier image téléchargé, générée de façon dynamique (ajout HTTP//, hote serveur, sous chemin image et nom du fichier)
        newImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

         //suppression du fichier image du répertoire avec la méthode unlink de fs
         const findUserPhoto = db.findOneUser(id);
         await findUserPhoto
          .then(user => {
             // récupération du nom du fichier image depuis le nom d'url renvoyé par la DB
             const { avatar } = user[0];
             //console.log(avatar);
             const filename = image.split('/images/')[1];
             fs.unlink(`images/${filename}`, () => {
                 
                db.changeUserPhoto(id, newImage)
                 .then(() => res.status(200).json({ message: 'Photo mise à jour !'}))
                 .catch(error => res.status(404).json ({ error }));
 
             });
                 })
                 
             .catch(err => console.log(err));

        }
    else {
        res.status(400).json ({ message: 'Echec chargement photo, mise à jour non effectuée !' });
    }

    } catch(error){
        console.log(error);
        res.sendStatus(400);
    }
};



// exportation d'une fonction asynchrone de suppression d'un utilisateur (son profil et ses contenus)
exports.deleteUser = async (req, res, next) => {
    try { 
    
        const idFromToken = req.userId;
        const id = req.params.id;
        const userRole = req.userRole;
        
        db.findOneUser(id)

        .then(user => {
            if ( user[0].userId == idFromToken || userRole == 'admin') {
                const  { userId } = user[0];
                // récupération du nom du fichier image depuis le nom d'url renvoyé par la DB
                const { avatar } = user[0];
                console.log(avatar);
                
                const filename = avatar.split('/images/')[1];
                //suppression du fichier image du répertoire avec la méthode unlink de fs
                fs.unlink(`images/${filename}`, () => {

                        db.deleteOneUser(userId)
                        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
                        .catch(error => res.status(404).json ({ error }))
                    
                        })
            } else { res.status(401).json ({ message: 'Non autorisé !' })}               
        })
        .catch(err => console.log(err));
        
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }

};



