//importation de la connexion et des requetes à la BDD
const db = require('../config/dbconfig');
// importation du module fastest-validator de validation des données
const Validator = require('fastest-validator');
// importation du module natif de gestion de fichiers node, 
const fs = require('fs');

// configuration du schéma de validation des inputs
const v = new Validator();
const postSchema = {
    message: {type:"string", optional: false, min:"3", max: "800"},
};

// exportation d'une fonction asynchrone de creation d'un nouveau post
exports.createPost = async (req, res, next)=> {

    try { 
        console.log(req);
        const authorId = req.userId;
        //console.log(author);
        const message = req.body.message;
        //console.log(message);
        let image = "";
        
        //validation de l'authorId
        if (!authorId) {
            return res.sendStatus(401).json({authErrorMsg : 'requête non autorisée'});
        }

        //validation des data
        const toValidate = {message}
        const postValidationResponse = v.validate(toValidate, postSchema);
        if (postValidationResponse !== true) {
            return res.status(400).json({
                message:"format de message incorrect",
                errors: postValidationResponse
            });

        } else {
            
            if(req.file) {
                // prend  en valeur l'adresse du fichier image téléchargé, générée de façon dynamique (ajout HTTP//, hote serveur, sous chemin image et nom du fichier)
                image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }
            
            const newPost = db.createPost(authorId, message, image);
            newPost
            // une fois la promesse résolue (post sauvegardé dans la BD), retourne code, id et données requêtes
            .then(data => res.status(201).json({ 
                postId: data,
                insertionDate: "",
                authorId: req.body.userId,
                message: req.body.message,
                image:req.file}))
            // retourne une erreur si echec dans la sauvegarde du post
            .catch(error => res.status(400).json({ error }));
       
        }
    }
    catch(e){
        console.log(e);
        res.sendStatus(400);
    }        
    
};

// exportation d'une fonction asynchrone de récupération de tous les posts
exports.getAllPosts = async (req, res, next)=> {
    try { 

     db.getAllPosts()

     .then(data => res.json({ allPosts: data}))
     .catch(err => console.log(err));

    }

    catch(e){
        console.log(e);
        res.sendStatus(400);
    }        
    
};
// exportation d'une fonction asynchrone de récupération de tous les posts d'un utilisateur
exports.getPostsFromUser = async (req, res, next)=> {
    try { 

     const authorId = req.params.user_id;
     const postsFromUser = db.getPostsFromUser(authorId);

     postsFromUser   
     .then(data => res.json({ postsFrom: data}))
     .catch(err => console.log(err));

    }

    catch(e){
        console.log(e);
        res.sendStatus(400);
    }        
    
};

// exportation d'une fonction asynchrone de suppression d'un post
exports.deleteOnePost = async (req, res, next) => {
    try { 
        const authorId = req.userId;
        const postId = req.params.id;
        //console.log(postId);
        const userRole = req.userRole;
        //console.log(userRole);
        
        db.findOnePost(postId)
        
        .then(post => {
            if ( post[0].authorId == authorId || userRole == 'admin') {

                // récupération du nom du fichier image depuis le nom d'url renvoyé par la DB
                const { image } = post[0];
                console.log(image);
                
                const filename = image.split('/images/')[1];
                //suppression du fichier image du répertoire avec la méthode unlink de fs
                fs.unlink(`images/${filename}`, () => {
                    
                       db.deleteOnePost(postId, authorId)
                       .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                       .catch(error => res.status(404).json ({ error }));  
                    
                });
                
            } else { res.status(401).json ({ message: 'Non autorisé !' })}
        })
                
            .catch(err => console.log(err));
                
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }

};


    