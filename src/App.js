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
import Routes from "./components/Routes/Routes";
import Cookies from "universal-cookie";

export default function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const name = cookies.get("firstName");

  function logout() {
    cookies.remove("email");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("role");
    cookies.remove("token");
    window.location.reload();
  }
  return (
  <div>
    <Menu />
    <Routes />
  </div>
  );
}