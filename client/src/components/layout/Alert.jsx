import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {removeAlert} from "../../features/alerts/alert";

const Alert = () => {
  const alertData = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alertData.length > 0) {
      const latestAlert = alertData[alertData.length - 1];
      const timer = setTimeout(() => {
        dispatch(removeAlert(latestAlert.id));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alertData, dispatch]);

  return (
    <>
      {alertData.length > 0 &&
        alertData.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        ))}
    </>
  );
};

export default Alert;
