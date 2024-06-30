import {Fragment, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import "./App.css";
import Navbar from "../src/components/layout/Navbar";
import Landing from "../src/components/layout/Landing";
import Login from "../src/components/auth/Login";
import Register from "../src/components/auth/Register";
import {Provider} from "react-redux";
import {store, persistor} from "./store/store";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profile from "./components/profiles/Profile";
import ViewProfile from "./components/profile/ViewProfile";
import Posts from "./components/posts/Posts";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Fragment>
            <Navbar />
            <Routes>
              <Route exact path="/" Component={Landing} />
            </Routes>
            <section className="container">
              <Alert />
              <Routes>
                <Route exact path="/login" Component={Login} />
                <Route exact path="/register" Component={Register} />
                <Route exact path="/profiles" Component={Profile} />
                <Route exact path="/profile/:id" Component={ViewProfile} />
                <Route Component={PrivateRoute}>
                  <Route exact path="/dashboard" Component={Dashboard} />
                  <Route
                    exact
                    path="/create-profile"
                    Component={CreateProfile}
                  />
                  <Route exact path="/edit-profile" Component={EditProfile} />
                  <Route
                    exact
                    path="/add-experience"
                    Component={AddExperience}
                  />
                  <Route exact path="/add-education" Component={AddEducation} />
                  <Route exact path="/posts" Component={Posts} />
                </Route>
              </Routes>
            </section>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
