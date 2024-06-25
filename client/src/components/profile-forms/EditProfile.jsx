import {Fragment, useEffect, useState} from "react";
import {
  useCreateProfileMutation,
  useGetLoggedInProfileQuery,
} from "../../services/profile/profileService";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "../../features/alerts/alert";
import {getProfile} from "../../features/profile/profile";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

const EditProfile = () => {
  const [showSocialInputs, setShowSocialInputs] = useState(false);
  const [createProfile, responseCreateProfile] = useCreateProfileMutation();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const navigate = useNavigate();
  const currentUser = useGetLoggedInProfileQuery({});
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  useEffect(() => {
    console.log("I am current user", currentUser);
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.youtube ? "" : profile.social.youtube,
      instagram: loading || !profile.instagram ? "" : profile.social.instagram,
    });
  }, [currentUser]);

  useEffect(() => {
    if (responseCreateProfile.isSuccess) {
      dispatch(getProfile(responseCreateProfile.data));
      dispatch(
        setAlert({msg: "Edited Profile Successfully!", alertType: "success"})
      );
    } else if (responseCreateProfile.isError) {
      responseCreateProfile.error.data.errors.map((value, index) => {
        dispatch(setAlert({msg: value.msg, alertType: "danger"}));
      });
    }
  }, [responseCreateProfile]);
  const submitData = (e) => {
    e.preventDefault();
    console.log("eee", formData);
    createProfile(formData);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Edit Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's make your profile more better
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => submitData(e)}>
        <div className="form-group">
          <select
            name="status"
            value={status}
            onChange={(e) => handleChange(e)}
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <snall className="form-text">
            Give us an idea of where you are at in your career
          </snall>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-test">Enter ur personal website</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Bangalore)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Please user comma separated values (eg. Go, Java, C++)
          </small>
        </div>
        <div className="from-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        <div className="my-2">
          <button
            onClick={() => setShowSocialInputs(!showSocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add social Network links
          </button>
          <span>Optional</span>
        </div>
        {showSocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go back
        </Link>
      </form>
    </Fragment>
  );
};

export default EditProfile;
