// importation d'express
const express = require('express');

// création d'un router express
const router = express.Router();

// importation des controllers post
const postCtrl = require('../controllers/post');

// importation du middleware d'authentification de l'utilisateur
const auth = require('../middleware/auth');

// importation du middleware multer, pour gérer les téléchargements de fichiers
const multer = require('../middleware/multer-config');

//création des sous chemins des posts, montage des middlewares et des controllers
router.get('/', auth, postCtrl.getAllPosts);//récupération de tous les posts
router.get('/:user_id', auth, postCtrl.getPostsFromUser);//recupération de tous les posts d'un utilisateur
router.post('/', auth, multer, postCtrl.createPost);//création d'un post
router.delete('/:id', auth, postCtrl.deleteOnePost);//suppression d'un post

//exportation du router pour pouvoir l'importer depuis un autre endroit du répertoire
module.exports = router;