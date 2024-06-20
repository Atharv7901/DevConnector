import {Fragment, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Navbar from "../src/components/layout/Navbar";
import Landing from "../src/components/layout/Landing";
import Login from "../src/components/auth/Login";
import Register from "../src/components/auth/Register";
import {Provider} from "react-redux";
import {store} from "./store/store";
import Alert from "./components/layout/Alert";
import {userLoaded, registerSuccess} from "./features/auth/auth";
import {authApi} from "./services/auth/authService";
import {useLoadUserQuery} from "./services/auth/authService";

const App = () => {

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     store.dispatch(registerSuccess(localStorage.getItem('token')));
  //     store.dispatch(authApi.endpoints.loadUser.initiate());
  //     store.dispatch()
  //   }
  // }, [])

  return (
    <Provider store={store}>
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
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
