import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import { NavbarComponent, TaskList ,AddTask,Task} from "./components";
import { Sukses,Register,Login, Dashboard,Profile, Logout } from "./pages";

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
              <Route path="/profile" component={Profile} />
              <Route path="/logout" component={Logout} />
              <Route exact path="/tasks" component={TaskList} />
              <Route exact path="/add" component={AddTask} />
              <Route path="/tasks/:id" component={Task} />
            </Switch>
          </main>
      </BrowserRouter>
    );
  }
}
