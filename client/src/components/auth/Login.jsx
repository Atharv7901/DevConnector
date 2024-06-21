import {Fragment, useEffect, useState} from "react";
import {Link, redirect, useNavigate} from "react-router-dom";
import {
  useLoginUserMutation,
  useLoadUserQuery,
} from "../../services/auth/authService";
import {setAlert} from "../../features/alerts/alert";
import {loginSuccess, loginFail, userLoaded} from "../../features/auth/auth";
import {useDispatch, useSelector} from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [skipLoadUser, setSkipLoadUser] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [loginUser, responseLoginUser] = useLoginUserMutation();
  const userData = useLoadUserQuery({}, {skip: skipLoadUser});

  const {email, password} = formData;

  const handleFormDataChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onLogin = (e) => {
    e.preventDefault();
    console.log("Logged in user", formData);
    loginUser(formData);
  };

  useEffect(() => {
    if (responseLoginUser.isSuccess) {
      dispatch(loginSuccess({token: responseLoginUser.data.token}));
      setSkipLoadUser(false);
    } else if (responseLoginUser.isError) {
      dispatch(loginFail());
      if (responseLoginUser.error) {
        responseLoginUser.error.data.errors.map((value, index) => {
          dispatch(setAlert({msg: value.msg, alertType: "danger"}));
        });
      }
    }
  }, [responseLoginUser]);

  useEffect(() => {
    if (userData.isSuccess) {
      dispatch(userLoaded(userData.data));
      navigate("/dashboard");
    }
  }, [userData]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Sign In to your account
      </p>
      <form className="form" onSubmit={(e) => onLogin(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => handleFormDataChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handleFormDataChange(e)}
            minLength={6}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Create Account</Link>
      </p>
    </Fragment>
  );
};

export default Login;
