import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Posts from '../components/Posts/PostsList';
import PostForm from '../components/NewPost/PostForm';
import { AuthContext } from '../utils/AuthContext';
import NotLoggedHome from '../components/Login/NotLoggedHome';

const Home = (props) => {
  const { authStatus } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPostsList, setNewPostsList] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);
        
  const getPosts = () => {
    axios.get('http://localhost:3000/api/posts')
    .then((res)=> setPosts(res.data.allPosts));     
  };

  const savePostDataHandler = (enteredPostData) => {
    for(let pair of enteredPostData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);}
    axios.post('http://localhost:3000/api/posts', enteredPostData)     
    .then(() => {setNewPostsList((prevPostsList) => {return [...prevPostsList, {enteredPostData}]});
    getPosts();});
    
  };

 const deletePostDataHandler = (key) => {
    const updatedPosts = posts.filter((post) => post.postId !== key);
    const postId = key;
        axios.delete('http://localhost:3000/api/posts/' + postId)
        .then((res)=>{
            console.log(res.data);
            setPosts(updatedPosts);       
        }); 
  };

    return (
      <div className="home">
        <div className="main">
            <div className="post-form-auth-toogle container">
              {authStatus.status ? (<PostForm className="new-post__form form" onSavePostData={savePostDataHandler}/>) : (<NotLoggedHome className="not-logged container"/>) }
            </div>
            <div className="posts-thread">
              {authStatus.status && <Posts posts={posts} newposts= {newPostsList} onDelete={deletePostDataHandler}/>}
            </div>
        </div>
      </div>
    );
  
}; 
    export default Home;