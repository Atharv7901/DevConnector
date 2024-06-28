import {Fragment, useEffect} from "react";
import Moment from "react-moment";
import {useDeleteExperienceMutation} from "../../services/profile/profileService";
import {useDispatch} from "react-redux";
import {updateProfile} from "../../features/profile/profile";
import {setAlert} from "../../features/alerts/alert";

const Experience = (props) => {
  const [deleteExperience, responseDeleteExperience] =
    useDeleteExperienceMutation();

  const dispatch = useDispatch();
  useEffect(() => {
    if (responseDeleteExperience.isSuccess) {
      dispatch(updateProfile(responseDeleteExperience.data));
      dispatch(setAlert({msg: "Deleted Experience!", alertType: "success"}));
    } else if (responseDeleteExperience.isError) {
      responseDeleteExperience.error.data.errors.map((value, index) => {
        dispatch(setAlert({msg: value.msg, alertType: "danger"}));
      });
    }
  }, [responseDeleteExperience]);
  const experiences =
    props.experience &&
    props.experience.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteExperience({id: exp._id})}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  return (
    <Fragment>
      <h2 className="my-2">Experience</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
