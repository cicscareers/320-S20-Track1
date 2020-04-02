import React from "react";
import Menu from "./components/Navigation/appbar.js";
import Routes from "./components/Routes/Routes";
import Cookies from "universal-cookie";

export default function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [auth, setAuth] = React.useState(token !== undefined);
  return (
  <div>
    {auth && ( <Menu /> )}
    <Routes />
  </div>
  );
}