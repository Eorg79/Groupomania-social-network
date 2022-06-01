import PostForm from './PostForm';
// composant à supprimer,à intégrer désormais dans home
const NewPost = (props) => {
    const savePostDataHandler = (enteredPostData) => {
        //console.log(enteredPostData);
        for(let pair of enteredPostData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
        }
        const newPostData = {
            ...enteredPostData
        };
        props.onAddPost(newPostData);
    };
 
    return <div className="new-post">
        <PostForm onSavePostData={savePostDataHandler} />
    </div>
};

export default NewPost;