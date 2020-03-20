import React from "react";
import LoginUI from "./components/login.js";
import Menu from "./components/scroll.js";
import resetPass from "./components/resetPass.js";
import signUp from "./components/signup.js";
import signUpSupporter from "./components/signUpSupporter.js";
import tos from "./components/TOS.js";
import appbar from "./components/appbar.js";
import home from "./components/home.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/TOS">
            <TOS />
          </Route>
          <Route path="/signup/supporter">
            <SignUpSupporter />
          </Route>
          <Route path="/signup">
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

function TOS() {
  return tos();
}
