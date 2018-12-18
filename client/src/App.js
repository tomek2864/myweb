import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import { Navbar, Footer } from "./components/layout";
import Landing from "./components/landing";
import Hello from "./components/landing/Hello";
import Projects from "./components/landing/Projects";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import { clearCurrentProfile } from "./actions/profileActions";

//Sprawdzanie czy token jest w localstorage
if (localStorage.jwtToken) {
  //Ustawienie auth tokenu w header auth
  setAuthToken(localStorage.jwtToken);
  //Pobranie informacji usera po decode tokenu
  const decodeed = jwt_decode(localStorage.jwtToken);
  // Ustawienie usera i isAuthenticated
  store.dispatch(setCurrentUser(decodeed));
  const currentTime = Date.now() / 3000; // auto logout
  if (decodeed.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Hello} />
            <Route exact path="/" component={Projects} />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
