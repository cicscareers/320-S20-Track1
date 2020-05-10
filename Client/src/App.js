import React from "react";
import Menu from "./Navigation/appbar.js";
import Routes from "./Routes/Routes";

export default function App() {

  const token = sessionStorage.getItem("token");
  const auth = React.useState(token !== null);

  return (
  <div>
    {auth && ( <Menu/> )}
    <Routes />
  </div>
  );
}