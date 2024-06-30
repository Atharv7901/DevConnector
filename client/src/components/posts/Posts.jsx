import {Fragment, useEffect, useState} from "react";
import {useGetAllPostsQuery} from "../../services/post/postService";
import {useDispatch, useSelector} from "react-redux";
import {getPosts, postError} from "../../features/post/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";

const Posts = () => {
  const [skipPosts, setSkipPosts] = useState(true);
  const postsData = useGetAllPostsQuery({}, {skip: skipPosts});

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.post.loading);
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    setSkipPosts(false);
  }, []);

  useEffect(() => {
    if (!skipPosts) {
      postsData.refetch().then((result) => {
        if (result.isSuccess) {
          dispatch(getPosts(result.data));
        } else if (result.isError) {
          dispatch(postError(result.error.data));
        }
      });
    }
  }, [skipPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>
      {/* Post create */}
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

export default Posts;
