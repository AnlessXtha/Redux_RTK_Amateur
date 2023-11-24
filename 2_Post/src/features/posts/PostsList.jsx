import React from "react";
import { useSelector } from "react-redux";

// Get all the post `with updated state`
import { selectAllPosts } from "./postsSlice";

// Components
import PostAuthor from "./PostAuthor";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
      </p>
    </article>
  ));
  // console.log(posts);
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
