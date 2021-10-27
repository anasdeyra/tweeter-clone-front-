import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Signup, Login } from "./auth/Auth.jsx";
import { AuthContext, AuthProvider } from "../contextes/AuthContext.jsx";
import Home from "./Home/Home.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import Profile from "./Profile/Profile.jsx";

export default class App extends Component {
  render() {
    return (
      <AuthProvider>
        <AuthContext.Consumer>
          {(Auth) => {
            return (
              <Router>
                {Auth.user && <Navbar username={Auth.user.username} />}

                <Switch>
                  <Route exact path="/login" children={<Login />} />
                  <Route exact path="/signup" children={<Signup />} />
                  <Route exact path="/home" children={<Home />} />
                  <Route exact path="/profile/:id" children={<Profile />} />
                  <Route
                    exact
                    path="/profile"
                    children={<Profile self={true} />}
                  />
                  <Route exact path="/test" children={<div />} />
                  <Route path="*" children={<Redirect to="/home" />} />
                </Switch>
              </Router>
            );
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );
  }
}
