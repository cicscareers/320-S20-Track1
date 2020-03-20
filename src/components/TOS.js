import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default function TOS() {
  return (
    <Container component="main" maxWidth="xs" align="center">
      <Typography component="h1" variant="h5" align="center">
        Terms and Conditions
      </Typography>
      <Grid container align="center">
        <Grid item xs>
          <Link href="/signup" variant="body2" align="center">
            Back to sign up
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
