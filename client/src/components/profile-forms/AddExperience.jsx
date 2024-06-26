import {Fragment, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAddExperienceMutation} from "../../services/profile/profileService";
import {updateProfile} from "../../features/profile/profile";
import {useDispatch} from "react-redux";
import {setAlert} from "../../features/alerts/alert";

const AddExperience = () => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDisabled, setToDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addExperience, responseAddExperience] = useAddExperienceMutation();

  const {company, title, location, from, to, current, description} = formData;

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  useEffect(() => {
    if (responseAddExperience.isSuccess) {
      dispatch(updateProfile(responseAddExperience.data));
      dispatch(
        setAlert({msg: "Experience Added Successfully!", alertType: "success"})
      );
      navigate("/dashboard");
    } else if (responseAddExperience.isError) {
      responseAddExperience.error.data.errors.map((value, index) => {
        dispatch(setAlert({msg: value.msg, alertType: "danger"}));
      });
    }
  }, [responseAddExperience]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addExperience(formData);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add your experiences to stand out
        your profile
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => onChange(e)}
            name="location"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({...formData, current: !current});
                setToDisabled(!toDisabled);
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDisabled ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  );
};

export default AddExperience;
