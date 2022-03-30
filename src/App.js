import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { NavbarComponent } from "./components";
import { Sukses,Register,Login, Dashboard,Profile, Logout } from "./pages";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent /> 
          <main>
            <Switch>
              <Route path="/" component={Dashboard} exact/>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/sukses" component={Sukses} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile} />
              <Route path="/logout" component={Logout} />
            </Switch>
          </main>
      </BrowserRouter>
    );
  }
}
