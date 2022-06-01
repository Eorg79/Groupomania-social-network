//initialisation module mysql
const mysql = require('mysql');

//creation des données de connexion à la DB
const connection = mysql.createConnection({

    host: "localhost",
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`
 
  });

//connexion à la DB
connection.connect((err) => {
    if (err) throw err;
    console.log("Connecté à la base de données!");
  });
  
  //gestion deconnexion
  //db.end((err) => {});
  
//module.exports = connection;
  
  /*//creation d'un pool de connexion à la DB
  const pool = mysql.createPool({
  
      host: "localhost",
      user: `${process.env.DB_USER}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_NAME}`,
      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 0
    });
  
  //connexion à la DB
  return pool;*/
let db = {}; //creation d'un objet vide pour ecrire et exporter les requetes

//écriture des requêtes sous forme de méthodes de l'objet db

//requêtes table user
db.createUser = (firstname, name, position, email, password, avatar) => {
  return new Promise((resolve, reject)=>{
      connection.query('INSERT INTO user (firstname, name, position, email, password, avatar, insertionDate) VALUES (?, ?, ?, ?, ?, ?, NOW())', [firstname, name, position, email, password, avatar], (error, result)=>{
          if(error){
              return reject(error);
          }
            return resolve(result.insertId);
      });
  });
};

db.changeUserInfo = (id, user) => {
  return new Promise((resolve, reject)=>{
      connection.query(`UPDATE user SET firstname="${user.firstName}", name="${user.name}", position="${user.position}", updateDate= NOW() WHERE userId="${id}"`, (error, result)=>{
          if(error){
              return reject(error);
          }
            return resolve(result.insertId);
      });
  });
};

db.changeUserPhoto = (id, avatar) => {
  return new Promise((resolve, reject)=>{
      connection.query(`UPDATE user SET avatar="${avatar}", updateDate= NOW() WHERE userId="${id}"`, (error, result)=>{
          if(error){
              return reject(error);
          }
            return resolve(result.insertId);
      });
  });
};

db.deleteUserPhoto = (id, avatar) => {
  return new Promise((resolve, reject)=>{
      connection.query('UPDATE user SET avatar=NULL, updateDate= NOW() WHERE userId=? AND avatar=?', [id, avatar], (error, result)=>{
          if(error){
              return reject(error);
          }
            return resolve(result.insertId);
      });
  });
};

db.changeUserPassword = (id, password) => {
  return new Promise((resolve, reject)=>{
      connection.query(`UPDATE user SET password="${password}", updateDate= NOW() WHERE userId="${id}"`, (error, result)=>{
          if(error){
              return reject(error);
          }
            return resolve(result.insertId);
      });
  });
};

db.changeUserEmail = (id, email) => {
  return new Promise((resolve, reject)=>{
      connection.query(`UPDATE user SET email="${email}", updateDate= NOW() WHERE userId="${id}"`, (error, result)=>{
          if(error){
              return reject(error);
          }
            return resolve(result.insertId);
      });
  });
};

db.deleteOneUser = (id) => {
  return new Promise((resolve, reject)=>{
      connection.query('DELETE FROM user WHERE userId= ?', [id], (error, result)=>{
          if(error){
              return reject(error);
          }
            return resolve(result);
      });
  });
};

db.getAllUsers = () =>{
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user', (error, result) => {
        if(error){
            return reject(error);
        }
          return resolve(result);
    });
  });
};

db.findOneUser = (id) =>{
  return new Promise((resolve, reject)=>{
      connection.query('SELECT * FROM user WHERE userId= ?', [id], (error, user)=>{
          if(error){
              return reject(error);
          }
          return resolve(user);
      });
  });
};

db.findUser = (email) => {
  return new Promise((resolve, reject)=>{
    connection.query('SELECT * FROM user WHERE email =?', [email], (error, result)=>{
        if(error){
            return reject(error);
        }
          return resolve(result);
    });
  });
};

//requêtes table post
db.createPost = (authorId, message, image) => {
  return new Promise((resolve, reject)=>{
      connection.query('INSERT INTO post (authorId, message, image, insertionDate) VALUES (?, ?, ?, NOW())', [authorId, message, image], (error, result)=>{
          if(error){
              return reject(error);
          }
            return resolve(result.insertId);
      });
  });
};

db.getAllPosts = () =>{
  return new Promise((resolve, reject) => {
    connection.query('SELECT post.postId, post.authorId, post.message, post.image, post.insertionDate, COALESCE(commentsNumber, 0) AS commentsNumber, user.userId, user.firstname, user.name, user.position, user.avatar FROM post LEFT JOIN (SELECT comment.postId, COUNT(*) AS commentsNumber FROM comment GROUP BY comment.postId) commentsNumber ON commentsNumber.postId = post.postId LEFT JOIN (SELECT user.userId, user.firstname, user.name, user.position, user.avatar FROM user) user ON post.authorId = user.userId ORDER BY insertionDate DESC', (error, result) => {
        if(error){
            return reject(error);
        }
          return resolve(result);
    });
  });
};

db.getPostsFromUser = (authorId) =>{
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM post INNER JOIN user ON post.authorId = user.userId WHERE authorId = ? ORDER BY post.insertionDate DESC', [authorId], (error, result) => {
        if(error){
            return reject(error);
        }
          return resolve(result);
    });
  });
};


db.findOnePost = (id) =>{
  return new Promise((resolve, reject)=>{
      connection.query('SELECT * FROM post WHERE postId= ?', [id], (error, result)=>{
          if(error){
              return reject(error);
          }
          return resolve(result);
      });
  });
};


db.deleteOnePost = (id) => {
  return new Promise((resolve, reject)=>{
      connection.query('DELETE post FROM post WHERE post.postId= ?', [id], (error, result)=>{
          if(error){
              return reject(error);
          }
            return resolve(result);
      });
  });
};

// requêtes table comment
db.createComment = (authorId, content, postId) => {
  return new Promise((resolve, reject)=>{
      connection.query('INSERT INTO comment (authorId, content, postId, insertionDate) VALUES (?, ?, ?, NOW())', [authorId, content, postId], (error, result)=>{
          if(error){
              return reject(error);
          }
            return resolve(result.insertId);
      });
  });
};

db.findAllCommentsForPost = (postId) =>{
  return new Promise((resolve, reject)=>{
      connection.query('SELECT comment.commentId, comment.authorId, comment.content, comment.postId, comment.insertionDate, user.userId, user.firstname, user.name, user.position, user.avatar FROM comment LEFT JOIN (SELECT user.userId, user.firstname, user.name, user.position, user.avatar FROM user) user ON comment.authorId = user.userId WHERE comment.postId= ? ORDER BY comment.insertionDate ASC', [postId], (error, result)=>{
          if(error){
              return reject(error);
          }
          return resolve(result);
      });
  });
};


db.findOneComment = (id) =>{
  return new Promise((resolve, reject)=>{
      connection.query('SELECT * FROM comment WHERE commentId= ?', [id], (error, result)=>{
          if(error){
              return reject(error);
          }
          return resolve(result);
      });
  });
};


db.deleteOneComment = (id) => {
  return new Promise((resolve, reject)=>{
      connection.query('DELETE comment FROM comment WHERE comment.commentId= ?', [id], (error, result)=>{
          if(error){
              return reject(error);
          }
            return resolve(result);
      });
  });
};

module.exports = db;


  