import React from "react"
import {makeStyles, Typography, Button, Container, TextField, Grid} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(2),
      align: "center",
      padding: 4
    },
    button: {
      width: "100%",
      marginTop: theme.spacing(2),
      align: "center",
    }
}));

function handleSubmit(){
    //TODO
}

const ProfileInformation = (props) => {
    const classes=useStyles();
    const [firstName, setFirstName]=React.useState("")
    const [prefName, setPrefName]=React.useState("")
    const [lastName, setLastName]=React.useState("")
    const [pronouns, setPronouns]=React.useState("")
    const [phoneNumber, setPhoneNumber]=React.useState("")
    const [email, setEmail]=React.useState("")
    const [bio, setBio]=React.useState("")
    return (
        <Container component="main">
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Profile Information
            </Typography>
            <form className={classes.form}>
                <Grid container>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            label="First Name"
                            autoFocus
                            form className={classes.form}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Preferred Name"
                            autoFocus
                            form className={classes.form}
                            onChange={e => setPrefName(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            label="Last Name"
                            autoFocus
                            form className={classes.form}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Pronouns"
                            autoFocus
                            form className={classes.form}
                            onChange={e => setPronouns(e.target.value)}
                        />
                    </Grid>
                </Grid>
                
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            label="Email Address"
                            autoFocus
                            form className={classes.form}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Phone Number"
                            autoFocus
                            form className={classes.form}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Personal Biography"
                    autoFocus
                    multiline
                    rows={4}
                    form className={classes.form}
                    onChange={e => setBio(e.target.value)}
                />
                <Button
                    margin="normal"
                    form className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </form>
        </div>
        </Container>
    );
}

export default ProfileInformation;