import React from "react";
import Login from "../Pages/login.js";
import ForgotPassword from "../Pages/resetPass.js";
import SignUp from "../Pages/signup.js";
import SignUpSupporter from "../Pages/signUpSupporter.js";
import tos from "../Pages/TOS.js";
import Home from "../Pages/home.js";
import appts from "../Pages/appts.js";
import NotFound from "../Pages/NotFound.js"
import Account from "../Pages/account.js";
import AdminSettings from "../Pages/adminSettings.js"
import SupporterSettings from "../Pages/SupporterSettings.js"
import Matching from "../Pages/match2.js"
import MatchingOld from "../Pages/search-appointment.js"
import { Route, Switch, Redirect } from "react-router-dom";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";
import AdminRoute from "./AdminRoute";
import SupporterRoute from "./SupporterRoute";
import Feedback from '../Pages/feedback';
import resetPassAfterEmail from "../Pages/restPassAfterEmail";
import FAQ from '../Pages/faq';
import Settings from '../Pages/settings.js'


export default function Routes() {
  return (
        <Switch>
          <Redirect exact from="/" to="/match" />
          <Route path="/home" exact component={Home} />
          <Route path="/FAQ" exact component={FAQ} />
          <Route path="/feedback" exact component={Feedback} />
          <Route path="/admin-settings" exact component={AdminSettings} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/supporter-settings" exact component={SupporterSettings} />
          <Route path="/login" exact component={Login} />
          <Route path="/match" exact component={Matching} />
          <Route path="/match-demo" exact component={MatchingOld} />
          <Route path="/TOS" exact component={tos} />
          <Route path="/appointments" exact component={appts} />
          <Route path="/account" exact component={Account} />
          <Route path="/signup-supporter" exact component={SignUpSupporter} />
          <dRoute path="/signup" exact component={SignUp} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/forgot-password2" exact component={resetPassAfterEmail} />
          <Route path="/index.html" to="/" />
          <Route component={NotFound} />
        </Switch>
  );
}