import {Fragment, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAddEducationMutation} from "../../services/profile/profileService";
import {updateProfile} from "../../features/profile/profile";
import {useDispatch} from "react-redux";
import {setAlert} from "../../features/alerts/alert";

const AddEducation = () => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDisabled, setToDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addEducation, responseAddEducation] = useAddEducationMutation();

  const {school, degree, fieldofstudy, from, to, current, description} =
    formData;

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  useEffect(() => {
    if (responseAddEducation.isSuccess) {
      dispatch(updateProfile(responseAddEducation.data));
      dispatch(
        setAlert({msg: "Education Added Successfully!", alertType: "success"})
      );
      navigate("/dashboard");
    } else if (responseAddEducation.isError) {
      responseAddEducation.error.data.errors.map((value, index) => {
        dispatch(setAlert({msg: value.msg, alertType: "danger"}));
      });
    }
  }, [responseAddEducation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addEducation(formData);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add your education to stand out
        your profile
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School"
            name="school"
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree"
            name="degree"
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            name="fieldofstudy"
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
            Current Education
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
            placeholder="Education Description"
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

export default AddEducation;
