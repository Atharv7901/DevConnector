import {Fragment, useEffect, useState} from "react";
import {useGetAllPostsQuery} from "../../services/post/postService";
import {useDispatch} from "react-redux";
import {getPosts, postError} from "../../features/post/post";

const Posts = () => {
  const [skipPosts, setSkipPosts] = useState(true);
  const postsData = useGetAllPostsQuery({}, {skip: skipPosts});

  const dispatch = useDispatch();

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
  return (
    <Fragment>
      <div>Hello</div>
      {console.log("postsdata", postsData)}
    </Fragment>
  );
};

export default Posts;
