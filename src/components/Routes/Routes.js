import React from "react";
import Login from "../Pages/login.js";
import ForgotPassword from "../Pages/resetPass.js";
import SignUp from "../Pages/signup.js";
import SignUpSupporter from "../Pages/signUpSupporter.js";
import tos from "../Pages/TOS.js";
import Home from "../Pages/home.js";
import appts from "../Pages/appts.js";
import Account from "../Pages/account.js";
import Matching from "../Pages/search-appointment.js"
import { Route, Switch, Redirect } from "react-router-dom";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";

export default function Routes() {
  return (
        <Switch>
          <Redirect exact from="/" to="/match" />
          <AuthenticatedRoute path="/home" exact component={Home} />
          <UnauthenticatedRoute path="/login" exact component={Login} />
          <AuthenticatedRoute path="/match" exact component={Matching} />
          <Route path="/TOS" exact component={tos} />
          <AuthenticatedRoute path="/ap" exact component={appts} />
          <AuthenticatedRoute path="/account" exact component={Account} />
          <UnauthenticatedRoute path="/signup/supporter" exact component={SignUpSupporter} />
          <UnauthenticatedRoute path="/signup" exact component={SignUp} />
          <UnauthenticatedRoute path="/forgot_password" exact component={ForgotPassword} />
        </Switch>
  );
}