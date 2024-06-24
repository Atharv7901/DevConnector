import {Fragment, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "../../features/alerts/alert";
import {
  useRegisterUserMutation,
  useLoadUserQuery,
} from "../../services/auth/authService";
import {
  registerSuccess,
  registerFail,
  userLoaded,
} from "../../features/auth/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const [skipLoadUser, setSkipLoadUser] = useState(true);

  const userData = useLoadUserQuery({}, {skip: skipLoadUser});

  const {name, email, password, password2} = formData;

  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleFormDataChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const [registerUser, responseRegisterUser] = useRegisterUserMutation();

  useEffect(() => {
    if (responseRegisterUser.isSuccess) {
      dispatch(registerSuccess({token: responseRegisterUser?.data?.token}));
      setSkipLoadUser(false);
    } else if (responseRegisterUser.isError) {
      dispatch(registerFail());
      console.log(responseRegisterUser);
      if (responseRegisterUser.error) {
        responseRegisterUser.error.data.errors.map((value, index) => {
          dispatch(setAlert({msg: value.msg, alertType: "danger"}));
        });
      }
    }
  }, [responseRegisterUser]);
  useEffect(() => {
    if (isAuthenticated && !skipLoadUser) {
      userData.refetch().then((result) => {
        if (result.isSuccess) {
          console.log("inside dispatch", result.data);
          dispatch(userLoaded(result.data));
          navigate("/dashboard");
        } else if (result.isError) {
          // Handle error if needed
          console.error("Failed to refetch user data:", result.error);
        }
      });
    }
  }, [skipLoadUser]);

  const onRegister = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert({msg: "Passwords do not match!", alertType: "danger"}));
    } else {
      registerUser({name, email, password});
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onRegister(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => handleFormDataChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => handleFormDataChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handleFormDataChange(e)}
            // minLength={6}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => handleFormDataChange(e)}
            // minLength={6}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sing In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
