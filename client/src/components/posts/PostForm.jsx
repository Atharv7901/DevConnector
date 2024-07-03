import {useEffect, useState} from "react";
import {useCreatePostMutation} from "../../services/post/postService";
import {addPost} from "../../features/post/post";
import {useDispatch} from "react-redux";
import {setAlert} from "../../features/alerts/alert";

const PostForm = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const [createPost, responseCreatePost] = useCreatePostMutation();

  useEffect(() => {
    if (responseCreatePost.isSuccess) {
      dispatch(addPost(responseCreatePost.data));
      dispatch(setAlert({msg: "Posted your content!", alertType: "success"}));
      setText("");
    }
  }, [responseCreatePost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({text});
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Greet your feed...</h3>
      </div>
      <form className="form my-1" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required={true}
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
