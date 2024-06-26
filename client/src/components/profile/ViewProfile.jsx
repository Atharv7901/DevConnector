import {Fragment, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useGetProfileByIDQuery} from "../../services/profile/profileService";
import {useDispatch, useSelector} from "react-redux";
import {getViewProfile} from "../../features/profile/profile";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const ViewProfile = (props) => {
  const {id} = useParams();
  const currentProfile = useGetProfileByIDQuery({userID: id});
  const dispatch = useDispatch();
  const viewProfile = useSelector((state) => state.profile.viewProfile);
  const loading = useSelector((state) => state.profile.loading);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentProfile.isSuccess) {
      dispatch(getViewProfile(currentProfile.data));
    }
  }, [currentProfile]);
  return (
    <Fragment>
      {viewProfile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === viewProfile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={viewProfile} />
            <ProfileAbout profile={viewProfile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {viewProfile.experience.length > 0 ? (
                <Fragment>
                  {viewProfile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience Found</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {viewProfile.education.length > 0 ? (
                <Fragment>
                  {viewProfile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education Found</h4>
              )}
            </div>

            {viewProfile.githubusername && (
              <ProfileGithub username={viewProfile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ViewProfile;
