import {Link, useParams} from "react-router-dom";
import {useGetPostByIDQuery} from "../../services/post/postService";
import {useEffect, useState, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPost} from "../../features/post/post";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import Moment from "react-moment";

const Post = () => {
  const {id} = useParams();
  const currentPost = useGetPostByIDQuery({postID: id});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(currentPost.data));
  }, [currentPost]);

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
        </>
      )}
    </Fragment>
  );
};

export default Post;
