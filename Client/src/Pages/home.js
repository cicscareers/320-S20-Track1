import React from "react";
import Matching from "../Pages/Matching.js";
import appts from "../Pages/appts.js";

import { Route, Switch, Redirect } from "react-router-dom";

const role = sessionsStorage.get("role");
const redirect= () => {
  if(role==="Student"){
    <Redirect exact from="/" to="/match" />
  }else{
    <Redirect exact from="/" to="/appointments" />
  }
}

export default redirect