import CommentForm from './CommentForm';

const NewComment = (props) => {
    const saveCommentDataHandler = (enteredCommentData) => {
        const newCommentData = {
            ...enteredCommentData
        };
        props.onAddComment(newCommentData);
    };
    
    return <div className="new-post">
        <CommentForm onSaveCommentData={saveCommentDataHandler} />
    </div>
};

export default NewComment;