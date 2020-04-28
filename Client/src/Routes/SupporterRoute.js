import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function SupporterRoute({
  component: C,
  appProps,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        sessionStorage.getItem("role") === "Supporter" ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}