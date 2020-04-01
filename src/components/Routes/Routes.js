import React from "react";
import Login from "../login.js";
import Menu from "../appbar.js";
import ForgotPassword from "../resetPass.js";
import SignUp from "../signup.js";
import SignUpSupporter from "../signUpSupporter.js";
import tos from "../TOS.js";
import appbar from "../appbar.js";
import Home from "../home.js";
import matchDemo from "../Match.js";
import appts from "../appts.js";
import Account from "../account.js";
import Matching from "../search-appointment.js"
import { Route, Switch, Redirect } from "react-router-dom";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";

export default function Routes() {
  return (
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" exact component={Home} />
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