//importation d'express
const express = require('express');
//importation du middleware de sécurisation du password
const password = require("../middleware/password");
// importation du middleware multer, pour gérer les téléchargements de fichiers
const multer = require('../middleware/multer-config');
// importation du middleware d'authentification de l'utilisateur
const auth = require('../middleware/auth');

// création d'un router express
const router = express.Router();

//importation des controllers user
const userCtrl = require('../controllers/user');

////création des sous chemins des users, montage des middlewares et des controllers
router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/info', auth, userCtrl.updateUserInfo);
router.delete('/:id', auth, userCtrl.deleteUser);
//exportation du router pour pouvoir l'importer depuis un autre endroit du répertoire
module.exports = router;