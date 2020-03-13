import React from "react";
import LoginUI from "./login.js";
import Menu from "./scroll.js";
import resetPass from "./resetPass.js"
import signUp from "./signup.js"
import signUpSupporter from "./signUpSupporter.js"
import tos from "./TOS.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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

function Home(){
  return <h2>Home</h2>;
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