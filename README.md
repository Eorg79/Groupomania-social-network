P7 GROUPOMANIA

Création d'un réseau social d'entreprise avec la stack:

côté client:
	React
côté serveur:
	NodeJS
	Express
	Mysql

Les utilisateurs du reséau GROUPOMANIA doivent créer un compte pour pouvoir accéder aux publications postés et poster eux-mêmes. Le login se fait grace à l'email et au mot de passe fournis lors de l'inscription. Un seul compte par adresse email.
Chaque utilisateur peut créer des posts -texte seul ou texte+photo- ou commenter les posts des autres utilisateurs. 
L'utilisateur peut également modifier les infos de sa page profil, supprimer les posts ou les commentaires dont il est l'auteur, ou supprimer son compte.
Les utilisateurs qui sont administreurs peuvent supprimer n'importe quel post et n'importe quel commentaire à des fins de modération.

Test du projet en local :

Cloner ce repository. A la racine du sous-dossier backend, créer un fichier.env et y coller les variables figurant dans le fichier txt des livrables P7.

BACK-END:

depuis la racine du sous dossier backend, ouvrir le terminal, entrer la commande

npm install

pour installer les dépendances, puis la commande npm start pour démarrer le serveur, qui s'execute sur le localhost:3000

BASE DE DONNEES:

se connecter à son serveur MySql et créer une base de données avec la commande:

CREATE DATABASE groupomania

importer le dump qui se trouve dans le dossier backend/config/groupomania_dump.sql:

-u root -p groupomania < -votre chemin d'accès local-groupomania.sql

Modifier les variables d'environnement DB_USER et DB_PASSWORD du fichier.env en fonction de vos user/password.

Des posts et des utilisateurs dont un admin sont déjà crées. Leurs identifiants figurent dans le fichier txt des livrables P7.

FRONT-END:

depuis la racine du sous dossier frontend, ouvrir le terminal, entrer la commande
npm install pour installer les dépendances, puis la commande npm start.
Accessible dans le navigateur via http://localhost:8000/
