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
                <Route Component={PrivateRoute}>
                  <Route exact path="/dashboard" Component={Dashboard} />
                  <Route
                    exact
                    path="/create-profile"
                    Component={CreateProfile}
                  />
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
