import {Link, useParams} from "react-router-dom";
import {useGetPostByIDQuery} from "../../services/post/postService";
import {useEffect, useState, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPost} from "../../features/post/post";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import Moment from "react-moment";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = () => {
  const {id} = useParams();
  const [skipPost, setSkipPost] = useState(true);
  const currentPost = useGetPostByIDQuery({postID: id}, {skip: skipPost});
  const dispatch = useDispatch();

  useEffect(() => {
    setSkipPost(false);
  }, []);

  useEffect(() => {
    if (!skipPost) {
      currentPost.refetch().then((result) => {
        if (result.isSuccess) {
          dispatch(getPost(result.data));
        }
      });
    }
  }, [skipPost]);
  const post = useSelector((state) => state.post.post);
  const loading = useSelector((state) => state.post.loading);
  return post === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {post && (
        <>
          <Link to="/posts" className="btn">
            Back to all posts
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${post.user}`}>
                <img className="round-img" src={post.avatar} alt="postAvatar" />
                <h4>{post.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
              <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
              </p>
            </div>
          </div>
          <CommentForm post={post} />
          {post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postID={post._id}
            />
          ))}
        </>
      )}
    </Fragment>
  );
};

export default Post;
