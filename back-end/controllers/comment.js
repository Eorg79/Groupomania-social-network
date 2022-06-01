//importation de la connexion et des requetes à la BDD
const db = require('../config/dbconfig');
// importation du module fastest-validator de validation des données
const Validator = require('fastest-validator');

// configuration du schéma de validation des inputs
const v = new Validator();
const commentSchema = {
    content: {type:"string", optional: false, min:"3", max: "800"},
    postId: {type:"string", optional: false, min:"1"},
};

// exportation d'une fonction asynchrone de creation d'un nouveau commentaire
exports.createComment = async (req, res, next)=> {
    
    try { 
        
        const authorId = req.userId;
        console.log(authorId);
        const content = req.body.content;
        console.log(content);
        const postId = req.params.post_id;
        console.log(postId);
        
        //validation de l'authorId
        if (!authorId) {
            return res.sendStatus(401).json({authErrorMsg : 'requête non autorisée'});
        }

        //validation des data            
        const toValidate = {content, postId};
        //console.log(toValidate);
        const commentValidationResponse = v.validate(toValidate, commentSchema);
        if (commentValidationResponse !== true) {
            return res.status(400).json({
                message:"format de données incorrect",
                errors: commentValidationResponse
            });

        } else {

        const newComment = db.createComment(authorId, content, postId);
        newComment
        // une fois la promesse résolue (comment sauvegardé dans la BD), retourne code, id et données de la requete
        .then(data => res.status(201).json({ 
            commentId: data,
            insertionDate: "",
            authorId: req.body.userId,
            content: req.body.content,
            postId: req.params.post_id}))
        // retourne une erreur si echec dans la sauvegarde du commentaire
        .catch(error => res.status(401).json({ error }));
         }
    }

    catch(e){
        console.log(e);
        res.sendStatus(400);
    }        
    
};

// exportation d'une fonction asynchrone de récupération de tous les commentaires d'un post
exports.findAllCommentsForPost = async (req, res, next)=> {
    try { 
    const postId = req.params.post_id;
    const AllCommentsForPost = db.findAllCommentsForPost(postId);
     
     AllCommentsForPost  
     .then(data => res.json({ comments: data}))
     .catch(err => console.log(err));

    }

    catch(e){
        console.log(e);
        res.sendStatus(400);
    }        
    
};

// exportation d'une fonction asynchrone de suppression d'un commentaire
exports.deleteOneComment = async (req, res, next) => {
    try { 
        
        const authorId = req.userId;
        const commentId = req.params.id;
        //console.log(commentId);
        const userRole = req.userRole;
        //console.log(userRole);
        
        const findComment = db.findOneComment(commentId);
        await findComment

        .then(comment => {
            if ( comment[0].authorId == authorId || userRole == 'admin') {
            
                    db.deleteOneComment(commentId)
                    .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
                    .catch(error => res.status(404).json ({ error }));  
                
            } else { res.status(401).json ({ message: 'Non autorisé !' })}
        })
            
        .catch(err => console.log(err));
             
        } catch(e){
            console.log(e);
            res.sendStatus(400);
        }      
};





    