import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Cookies from "universal-cookie";

export default function accts() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const fname = cookies.get("firstName");
  const lname = cookies.get("lastName");
  const role = cookies.get("role");
  const email = cookies.get("email");
  return (
    <Container component="main" maxWidth="xs" align="center">
      <Typography component="h1" variant="h5" align="center">
        User: {fname} {lname}
      </Typography>
      <Typography component="h1" variant="h5" align="center">
        Role: {role}
      </Typography>
      <Typography component="h1" variant="h5" align="center">
        Email Address: {email}
      </Typography>
    </Container>
  );
}
