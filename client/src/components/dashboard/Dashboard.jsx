import {useDispatch} from "react-redux";
import {useGetLoggedInProfileQuery} from "../../services/profile/profileService";
import {useEffect} from "react";
import {getProfile, profileError} from "../../features/profile/profile";

const Dashboard = () => {
  const userData = useGetLoggedInProfileQuery({});
  const dispatch = useDispatch();

  useEffect(() => {
    userData.refetch();
  }, []);

  useEffect(() => {
    if (userData.isSuccess) {
      dispatch(getProfile(userData.data));
    } else if (userData.isError) {
      dispatch(profileError(userData.error.data));
    }
  }, [userData]);
  return (
    <>
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
