import {Fragment, useEffect, useState} from "react";
import {useGetAllProfilesQuery} from "../../services/profile/profileService";
import {getProfiles} from "../../features/profile/profile";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

const Profile = () => {
  const [skipProfiles, setSkipProfiles] = useState(true);
  const loading = useSelector((state) => state.profile.loading);
  const profileData = useSelector((state) => state.profile.profiles);
  const profiles = useGetAllProfilesQuery({}, {skip: skipProfiles});
  const dispatch = useDispatch();

  useEffect(() => {
    if (!skipProfiles) {
      profiles.refetch().then((result) => {
        if (result.isSuccess) {
          dispatch(getProfiles(result.data));
        } else if (result.isError) {
          console.log("error has occurred!");
        }
      });
    }
  }, [skipProfiles]);

  useEffect(() => {
    setSkipProfiles(false);
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Connect with Developers
          </p>
          <div className="profiles">
            {profileData.length > 0 ? (
              profileData.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
