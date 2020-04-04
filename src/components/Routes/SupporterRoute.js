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
        cookies.get("role") === "Supporter" ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}