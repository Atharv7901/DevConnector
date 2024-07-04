import {useEffect, useState} from "react";
import {useAddCommentMutation} from "../../services/post/postService";
import {useDispatch} from "react-redux";
import {addComment} from "../../features/post/post";
import {setAlert} from "../../features/alerts/alert";

const CommentForm = (props) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [postComment, responsePostComment] = useAddCommentMutation();

  useEffect(() => {
    if (responsePostComment.isSuccess) {
      dispatch(addComment(responsePostComment.data));
      dispatch(setAlert({msg: "Comment added!", alertType: "success"}));
      setText("");
    }
  }, [responsePostComment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postID = props.post._id;
    const data = {postID, text};
    postComment(data);
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Share your views...</h3>
      </div>
      <form className="form my-1" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required={true}
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
