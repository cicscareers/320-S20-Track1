import React, { useEffect } from "react";
import Menu from "./Navigation/appbar.js";
import Routes from "./Routes/Routes";
import Cookies from "universal-cookie";

export default function App() {

  const cookies = new Cookies();
  const token = cookies.get("token");
  const [auth, setAuth] = React.useState(token !== undefined);
  const [userRoles, setUserRoles] = React.useState();

  return (
  <div>
    {auth && ( <Menu/> )}
    <Routes />
  </div>
  );
}