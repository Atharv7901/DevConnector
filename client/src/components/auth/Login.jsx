import {Fragment, useState} from "react";
import {Link} from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password} = formData;

  const handleFormDataChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onLogin = (e) => {
    e.preventDefault();
    console.log("Logged in user", formData);
  };

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
