// importation d'express
const express = require('express');

// création d'un router express
const router = express.Router();

// importation des controllers comment
const commentCtrl = require('../controllers/comment');

// importation du middleware d'authentification de l'utilisateur
const auth = require('../middleware/auth');

//création des sous chemins des comments, montage des middlewares et des controllers
router.get('/:post_id', auth, commentCtrl.findAllCommentsForPost);//récupération de tous les comments d'un post
router.post('/:post_id', auth, commentCtrl.createComment);//création d'un commentaire
router.delete('/:id', auth, commentCtrl.deleteOneComment);//suppression d'un commentaire

//exportation du router pour pouvoir l'importer depuis un autre endroit du répertoire
module.exports = router;