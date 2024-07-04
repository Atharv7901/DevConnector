import Moment from "react-moment";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useRemoveCommentMutation} from "../../services/post/postService";
import {removeComment} from "../../features/post/post";
import {useEffect} from "react";
import {setAlert} from "../../features/alerts/alert";

const CommentItem = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [deleteComment, responseDeleteComment] = useRemoveCommentMutation();

  useEffect(() => {
    if (responseDeleteComment.isSuccess) {
      dispatch(removeComment(props.comment._id));
      dispatch(setAlert({msg: "Comment deleted!", alertType: "danger"}));
    }
  }, [responseDeleteComment]);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteComment({postID: props.postID, commentID: props.comment._id});
  };

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${props.comment.user}`}>
          <img
            className="round-img"
            src={props.comment.avatar}
            alt="commentAvatar"
          />
          <h4>{props.comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{props.comment.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{props.comment.date}</Moment>
        </p>
        {!auth.loading && auth.user._id === props.comment.user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => handleDelete(e)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
