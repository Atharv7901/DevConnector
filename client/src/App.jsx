import {Fragment} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Navbar from "../src/components/layout/Navbar";
import Landing from "../src/components/layout/Landing";
import Login from "../src/components/auth/Login";
import Register from "../src/components/auth/Register";
import {Provider} from "react-redux";
import {store} from "./store/store";
import Alert from "./components/layout/Alert";

const App = () => {
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
