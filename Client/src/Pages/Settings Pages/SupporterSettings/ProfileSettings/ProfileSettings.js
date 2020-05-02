import React from "react"
import {makeStyles, Typography, Button, Avatar, Container, Box, TextField, Grid} from "@material-ui/core";

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
    },
    avatar: {
        marginLeft: "42%",
        marginRight: "50%",
        width: theme.spacing(25),
        height: theme.spacing(25)
    },
}));

function handleSubmit(){
    //TODO
}

const ProfileInformation = (props) => {
    const classes=useStyles();
    const {settings} = props
    const [firstName, setFirstName]=React.useState(settings.first_name)
    const [prefName, setPrefName]=React.useState(settings.preferred_name)
    const [lastName, setLastName]=React.useState(settings.last_name)
    const [pronouns, setPronouns]=React.useState(settings.pronouns)
    const [phoneNumber, setPhoneNumber]=React.useState(settings.phone)
    const [email, setEmail]=React.useState(settings.email)
    const [linkedIn, setLinkedIn]=React.useState(settings.link)
    const [bio, setBio]=React.useState("")
    return (
        <Container component="main">
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Profile Information
            </Typography>
            <form className={classes.form}>
                <Avatar className={classes.avatar} src={settings.picture}/>
                <br/>
                <Grid container>
                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            label="First Name"
                            autoFocus
                            defaultValue={firstName}
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
                            defaultValue={prefName}
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
                            defaultValue={lastName}
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
                            defaultValue={pronouns}
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
                            defaultValue={email}
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
                            defaultValue={phoneNumber}
                            form className={classes.form}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    label="LinkedIn"
                    autoFocus
                    defaultValue={linkedIn}
                    form className={classes.form}
                    onChange={e => setLinkedIn(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Personal Biography"
                    autoFocus
                    multiline
                    rows={4}
                    defaultValue={bio}
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