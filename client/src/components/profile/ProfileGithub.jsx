import {useEffect} from "react";
import {useGetGithubReposQuery} from "../../services/profile/profileService";
import {useDispatch, useSelector} from "react-redux";
import {getRepos} from "../../features/profile/profile";
import Spinner from "../layout/Spinner";

const ProfileGithub = (props) => {
  const githubRepos = useGetGithubReposQuery({username: props.username});
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.profile.repos);

  useEffect(() => {
    console.log("this is the data", githubRepos);
    if (githubRepos.isSuccess) {
      dispatch(getRepos(githubRepos.data));
    } else if (githubRepos.isError) {
      dispatch(getRepos([]));
    }
  }, [githubRepos]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProfileGithub;
