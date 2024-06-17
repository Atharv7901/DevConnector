import {Fragment} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Navbar from "../src/components/layout/Navbar";
import Landing from "../src/components/layout/Landing";
import Login from "../src/components/auth/Login";
import Register from "../src/components/auth/Register";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route exact path="/" Component={Landing} />
        </Routes>
        <section className="container">
          <Routes>
            <Route exact path="/login" Component={Login} />
            <Route exact path="/register" Component={Register} />
          </Routes>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
