import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SupporterRoute({
  component: C,
  appProps,
  ...rest
}) {
  const cookies = new Cookies();
  return (
    <Route
      {...rest}
      render={props =>
        (cookies.get("role") === "supporter" || cookies.get("role") === "admin") ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}