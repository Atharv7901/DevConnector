import {useDispatch, useSelector} from "react-redux";
import {useGetLoggedInProfileQuery} from "../../services/profile/profileService";
import {Fragment, useEffect, useState} from "react";
import {
  clearProfile,
  getProfile,
  profileError,
} from "../../features/profile/profile";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import {useDeleteAccountMutation} from "../../services/profile/profileService";
import {logout} from "../../features/auth/auth";
import {setAlert} from "../../features/alerts/alert";

const Dashboard = () => {
  const [skipUser, setSkipUser] = useState(true);
  const userData = useGetLoggedInProfileQuery({}, {skip: skipUser});
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

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
          setShowDetails(true);
        } else if (result.isError) {
          dispatch(profileError(result.error.data));
        }
      });
    }
  }, [skipUser]);

  //delete account
  const [deleteAccount, responseDeleteAccount] = useDeleteAccountMutation();

  useEffect(() => {
    if (responseDeleteAccount.isSuccess) {
      dispatch(clearProfile());
      dispatch(logout());
      dispatch(
        setAlert({msg: "Account deleted permenantly!", alertType: "danger"})
      );
    } else if (responseDeleteAccount.isError) {
      responseDeleteAccount.error.data.errors.map((value, index) => {
        dispatch(setAlert({msg: value.msg, alertType: "danger"}));
      });
    }
  }, [responseDeleteAccount]);

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
          {showDetails && (
            <>
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
            </>
          )}
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
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
