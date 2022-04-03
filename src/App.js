import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import { NavbarComponent} from "./components";
import { Sukses,Register,Login, Dashboard, Logout } from "./pages";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent /> 
          <main>
            <Switch>
              <Route path={["/","/dashboard"]} component={Dashboard} exact/>
              <Route path="/sukses" component={Sukses} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
       
            </Switch>
          </main>
      </BrowserRouter>
    );
  }
}
