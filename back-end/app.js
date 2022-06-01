const express = require('express');
//importation et configuration de dotenv pour gérer les variables d'environnement
require('dotenv').config();
//importation du module helmet, pour sécuriser les headers HTTP
const helmet = require('helmet');
//importation du module path, pour gérer les chemins vers les répertoires et fichiers
const path = require('path');
//importation du module cors, pour configurer les headers
const cors = require('cors');
//importation du module de DB
require('./config/dbconfig');

//importation des routers pour les sous-chemins users et sauces
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

//creation application express
const app = express();

app.use(helmet());

app.use(cors());

//lancement de la fonction intégrée pour parser le JSON (conversion chaines JSON en objects JS)
app.use(express.json());
//lancement de la fonction intégrée pour parser les payload des requetes
app.use(express.urlencoded({extended:true}));

// définition chemin virtuel pour l'accès aux fichiers images statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

//création des routes principales, avec leurs routers de sous-chemins
app.use('/api/auth', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

//exportation du module de l'application express, pour pouvoir l'importer depuis un autre endroit du répertoire
module.exports = app;