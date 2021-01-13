/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {PrivateRoute} from "./privateRouter"

// core components
import Admin from "layouts/Admin.js";
import SignIn from "./views/SignIn/SignIn";
import Profile from "./views/Profile/EditProfile";
import UserDetails from "./views/UserDetails/UserDetails";
import HistoryDetails from "./views/HistoryDetails/HistoryDetails";
import UserHistories from "./components/ListHistoriesUser/ListHistoriesUser";
import Error404 from "./components/Error404/error404";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" exact component={SignIn}/>
      <PrivateRoute path="/profile" component={Profile}/>
      <PrivateRoute path="/userdetails/:id" exact component={UserDetails}/>
      <PrivateRoute path="/history/:id" exact component={HistoryDetails}/>
      <PrivateRoute path="/userhistories/:id" exact component={UserHistories}/>
      <PrivateRoute path="/admin" component={Admin} />
      <Route path="/"  component={Error404} />
      {/* <Redirect from="/" to="/admin/dashboard" /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
