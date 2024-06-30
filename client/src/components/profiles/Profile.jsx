import {Fragment, useEffect} from "react";
import {useGetAllProfilesQuery} from "../../services/profile/profileService";
import {getProfiles} from "../../features/profile/profile";

const Profile = () => {
  const profiles = useGetAllProfilesQuery();

  useEffect(() => {
    if (profiles.isSuccess) {
      console.log("inside profiles");
    }
  }, [profiles]);

  return (
    <Fragment>
      <div>Hello</div>
    </Fragment>
  );
};

export default Profile;
