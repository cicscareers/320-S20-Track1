import React, { useEffect } from "react";
import Menu from "./Navigation/appbar.js";
import Routes from "./Routes/Routes";

export default function App() {

  const token = sessionStorage.getItem("token");
  const [auth, setAuth] = React.useState(token !== null);

  return (
  <div>
    {auth && ( <Menu/> )}
    <Routes />
  </div>
  );
}