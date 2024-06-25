import {useDispatch, useSelector} from "react-redux";
import {useGetLoggedInProfileQuery} from "../../services/profile/profileService";
import {Fragment, useEffect, useState} from "react";
import {getProfile, profileError} from "../../features/profile/profile";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";

const Dashboard = () => {
  const [skipUser, setSkipUser] = useState(true);
  const userData = useGetLoggedInProfileQuery({}, {skip: skipUser});
  const dispatch = useDispatch();

  //redux states
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setSkipUser(false);
  }, []);

  useEffect(() => {
    if (!skipUser) {
      userData.refetch().then((result) => {
        if (result.isSuccess) {
          dispatch(getProfile(result.data));
        } else if (result.isError) {
          dispatch(profileError(result.error.data));
        }
      });
    }
  }, [skipUser]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not setup a profile yet, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
