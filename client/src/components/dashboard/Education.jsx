import {Fragment, useEffect} from "react";
import Moment from "react-moment";
import {useDeleteEducationMutation} from "../../services/profile/profileService";
import {useDispatch} from "react-redux";
import {updateProfile} from "../../features/profile/profile";
import {setAlert} from "../../features/alerts/alert";

const Education = (props) => {
  const [deleteEducation, responseDeleteEducation] =
    useDeleteEducationMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (responseDeleteEducation.isSuccess) {
      dispatch(updateProfile(responseDeleteEducation.data));
      dispatch(setAlert({msg: "Deleted Education!", alertType: "success"}));
    } else if (responseDeleteEducation.isError) {
      responseDeleteEducation.error.data.errors.map((value, index) => {
        dispatch(setAlert({msg: value.msg, alertType: "danger"}));
      });
    }
  }, [responseDeleteEducation]);

  const educations =
    props.education &&
    props.education.map((edu) => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteEducation({id: edu._id})}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <Fragment>
      <h2 className="my-2">Education</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
