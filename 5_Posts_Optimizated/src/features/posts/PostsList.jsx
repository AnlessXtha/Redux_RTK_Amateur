import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";

import PostsExerpt from "./PostsExerpt";

const PostsList = () => {
  // const posts = useSelector(selectAllPosts);
  const orderedPostIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading"</p>;
  } else if (postsStatus === "succeeded") {
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));
    // content = orderedPosts.map((post) => (
    //   <PostsExerpt key={post.id} post={post} />
    // ));
    content = orderedPostIds.map((postId) => (
      <PostsExerpt key={postId} postId={postId} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }
  // console.log(content);
  return <section>{content}</section>;
};
export default PostsList;
