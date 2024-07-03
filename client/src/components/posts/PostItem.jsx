import Moment from "react-moment";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {
  useAddLikeMutation,
  useRemoveLikesMutation,
  useDeletePostMutation,
} from "../../services/post/postService";
import {useEffect, useState} from "react";
import {updateLikes, deletePost} from "../../features/post/post";
import {setAlert} from "../../features/alerts/alert";

const PostItem = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addLike, responseLikePost] = useAddLikeMutation();
  const [removeLike, responseRemoveLike] = useRemoveLikesMutation();
  const [deletePosts, responseDeletePost] = useDeletePostMutation();
  const [localLikes, setLocalLikes] = useState(props.post.likes.length);

  useEffect(() => {
    if (responseLikePost.isSuccess) {
      dispatch(
        updateLikes({
          id: responseLikePost.data._id,
          likes: responseLikePost.data,
        })
      );
      dispatch(setAlert({msg: "Liked Post!", alertType: "success"}));
      setLocalLikes(responseLikePost.data.length);
    } else if (responseLikePost.isError) {
      dispatch(
        setAlert({msg: responseLikePost.error.data.msg, alertType: "danger"})
      );
    }
  }, [responseLikePost]);

  const likePost = (e) => {
    e.preventDefault();
    addLike({postID: props.post._id});
  };

  useEffect(() => {
    if (responseRemoveLike.isSuccess) {
      dispatch(
        updateLikes({
          id: responseRemoveLike.data._id,
          likes: responseRemoveLike.data,
        })
      );
      dispatch(setAlert({msg: "Disliked post!", alertType: "success"}));
      setLocalLikes(responseRemoveLike.data.length);
    } else if (responseRemoveLike.isError) {
      dispatch(
        setAlert({msg: responseRemoveLike.error.data.msg, alertType: "danger"})
      );
    }
  }, [responseRemoveLike]);

  const handleDislike = (e) => {
    e.preventDefault();
    removeLike({postID: props.post._id});
  };

  useEffect(() => {
    if (responseDeletePost.isSuccess) {
      dispatch(deletePost(props.post._id));
      dispatch(setAlert({msg: "Delete Post!", alertType: "danger"}));
    }
  }, [responseDeletePost]);

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("this is the deleteed", props.post._id);
    deletePosts({id: props.post._id});
  };
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${props.post.user}`}>
          <img className="round-img" src={props.post.avatar} alt="postAvatar" />
        </Link>
      </div>
      <div>
        <p className="my-1">{props.post.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{props.post.date}</Moment>
        </p>
        <button
          type="button"
          className="btn btn-light"
          onClick={(e) => likePost(e)}
        >
          <i className="fas fa-thumbs-up" />{" "}
          <span>{localLikes > 0 && <span>{localLikes}</span>}</span>
        </button>
        <button
          onClick={(e) => handleDislike(e)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-down" />
        </button>
        <Link to={`/post/${props.post._id}`} className="btn btn-primary">
          Discussion{" "}
          {props.post.comments.length > 0 && (
            <span className="comment-count">{props.post.comments.length}</span>
          )}
        </Link>
        {!auth.loading && props.post.user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => handleDelete(e)}
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
