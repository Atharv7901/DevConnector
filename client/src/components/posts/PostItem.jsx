import Moment from "react-moment";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const PostItem = (props) => {
  const auth = useSelector((state) => state.auth);
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
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up" />{" "}
          <span>
            {props.post.likes.length > 0 && (
              <span>{props.post.likes.length}</span>
            )}
          </span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down" />
        </button>
        <Link to={`/post/${props.post._id}`} className="btn btn-primary">
          Discussion{" "}
          {props.post.comments.length > 0 && (
            <span className="comment-count">{props.post.comments.length}</span>
          )}
        </Link>
        {!auth.loading && props.post.user === auth.user._id && (
          <button type="button" className="btn btn-danger">
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
