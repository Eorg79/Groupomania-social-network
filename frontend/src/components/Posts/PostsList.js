import React from "react";
import CardPost from "./CardPost";

const Posts = (props) => {
    const { posts, onDelete } = props;
    
    return (
        <div className="posts">
            <ul className="posts-list container">
                {posts.map((post) => (
                  <CardPost post={post} key={post.postId} onDelete={onDelete}/>
                ))}
            </ul>

        </div>
    );
};

export default Posts;
