import React from "react";
import Login from "../Pages/login.js";
import ForgotPassword from "../Pages/resetPass.js";
import SignUp from "../Pages/signup.js";
import SignUpSupporter from "../Pages/signUpSupporter.js";
import tos from "../Pages/TOS.js";
import appts from "../Pages/appts.js";
import NotFound from "../Pages/NotFound.js";
import StudentSettings from "../Pages/Settings Pages/StudentSettings/SettingsMain/StudentSettings.js";
import AdminSettings from "../Pages/Settings Pages/AdminSettings/SettingsMain/AdminSettings.js";
import SupporterSettings from "../Pages/Settings Pages/SupporterSettings/SettingsMain/SupporterSettings.js";
import Matching from "../Pages/FindSupporter/MatchingHome/Matching.js";
import { Route, Switch, Redirect } from "react-router-dom";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";
import AdminRoute from "./AdminRoute";
import Cookies from "universal-cookie";
import SupporterRoute from "./SupporterRoute";
import StudentRoute from "./StudentRoute.js";
import Feedback from "../Pages/feedback";
import SupporterBlocks from "../Pages/Settings Pages/SupporterSettings/AppointmentBlocks/Main/BlockCreation.js";
//import Home from "../Pages/home.js";
import resetPassAfterEmail from "../Pages/restPassAfterEmail";
import FAQ from "../Pages/faq";

const cookies = new Cookies();
var role = cookies.get("role");

export default function Routes() {
  return (
    <Switch>
      {role === "Student" && <Redirect exact from="/" to="/match" />}
      {role !== "Student" && <Redirect exact from="/" to="/appointments" />}
      <AuthenticatedRoute path="/FAQ" exact component={FAQ} />
      <AuthenticatedRoute path="/feedback" exact component={Feedback} />
      <AdminRoute path="/admin-settings" exact component={AdminSettings} />
      <SupporterRoute
        Route
        path="/supporter-settings"
        exact
        component={SupporterSettings}
      />
      <Route path="/create-block" exact component={SupporterBlocks} />
      <UnauthenticatedRoute path="/login" exact component={Login} />
      <StudentRoute path="/match" exact component={Matching} />
      <Route path="/TOS" exact component={tos} />
      <AuthenticatedRoute path="/appointments" exact component={appts} />
      <AuthenticatedRoute path="/account" exact component={StudentSettings} />
      <UnauthenticatedRoute
        path="/signup-supporter"
        exact
        component={SignUpSupporter}
      />
      <UnauthenticatedRoute path="/signup" exact component={SignUp} />
      <UnauthenticatedRoute
        path="/forgot-password"
        exact
        component={ForgotPassword}
      />
      <UnauthenticatedRoute
        path="/forgot-password2"
        exact
        component={resetPassAfterEmail}
      />
      <Route path="/index.html" to="/" />
      <Route component={NotFound} />
    </Switch>
  );
}
