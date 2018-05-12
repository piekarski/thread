import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";

export default({childProps}) => <Switch>
  <AppliedRoute path="/" exact={true} component={Home} props={childProps}/>
  <AppliedRoute path="/login" exact={true} component={Login} props={childProps}/>
  <AppliedRoute path="/signup" exact={true} component={Signup} props={childProps}/>
  <Route component={NotFound}/>
</Switch>;