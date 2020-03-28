import React from "react";
import LoginUI from "./components/login.js";
import Menu from "./components/appbar.js";
import resetPass from "./components/resetPass.js";
import signUp from "./components/signup.js";
import signUpSupporter from "./components/signUpSupporter.js";
import tos from "./components/TOS.js";
import appbar from "./components/appbar.js";
import home from "./components/home.js";
import matchDemo from "./components/Match.js";
import appts from "./components/appts.js";
import accts from "./components/account.js";
import Matching from "./components/search-appointment.js"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            {Menu()}
            <Login />
          </Route>
          <Route path="/match">
            {Menu()}
            <Matching />
          </Route>
          <Route path="/TOS">
            <TOS />
          </Route>
          <Route path="/ap">
            {Menu()}
            <Apts />
          </Route>
          <Route path="/account">
            {Menu()}
            <Account />
          </Route>
          <Route path="/signup/supporter">
            {Menu()}
            <SignUpSupporter />
          </Route>
          <Route path="/signup">
            {Menu()}
            <SignUp />
          </Route>
          <Route path="/forgot_password">
            <ForgotPassword />
          </Route>
          <Route path="/">
            {Menu()}
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return home();
}

function Login() {
  return LoginUI();
}

function ForgotPassword() {
  return resetPass();
}

function SignUp() {
  return signUp();
}

function SignUpSupporter() {
  return signUpSupporter();
}
function MatchDemo(){
  return matchDemo();
}
function TOS() {
  return tos();
}
function Apts(){
  return appts();
}
function Account(){
  return accts();
}