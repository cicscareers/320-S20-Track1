import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default function notFound() {
    return (
        <Container component="main" maxWidth="xs" align="center">
            <br />
            <br />
            <br />
            <Typography component="h1" variant="h5" align="center">
                Page not found.
            </Typography>
            <br />
            <img height="175" width="175" src="cicscareers_logo_3.png"></img>
        </Container>
    );
}
