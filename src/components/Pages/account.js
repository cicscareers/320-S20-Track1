import React from "react";
import {Container, Typography} from "@material-ui/core";

import Cookies from "universal-cookie";

export default function accts() {

  const cookies = new Cookies();
  const fname = cookies.get("firstName");
  const lname = cookies.get("lastName");
  const role = cookies.get("role");
  const email = cookies.get("email");

  //This is just filler for the accounts page which is yet to be implimented
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
