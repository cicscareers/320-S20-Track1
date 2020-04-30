import React from "react"
import {makeStyles, Typography, Button, Container, TextField, Grid} from "@material-ui/core";
import {Autocomplete} from '@material-ui/lab';
import SupporterTypes from './SupporterTypes.js'
import Teams from './Teams.js'
import Specializations from './Specializations.js'

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
    const [supporterTypes, setSupporterTypes]=React.useState([]);
    const [teams, setTeams]=React.useState([]);
    const [specializations, setSpecializations]=React.useState([]);
    const [employer, setEmployer]=React.useState("");
    const [title, setTitle]=React.useState("");
    
    return (
        <Container component="main">
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Supporter Information
            </Typography>
            <form className={classes.form}>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Current Employer"
                            autoFocus
                            form className={classes.form}
                            onChange={e => setEmployer(e.target.value)}
                        />   
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Title"
                            autoFocus
                            form className={classes.form}
                            onChange={e => setTitle(e.target.value)}
                        />   
                    </Grid>
                </Grid>
                <Autocomplete
                    multiple
                    className={classes.form}
                    options={SupporterTypes}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Supporter Types"
                    />
                    )}
                    onChange={(e,v) => setSupporterTypes(v)}
                />
                <Autocomplete
                    multiple
                    className={classes.form}
                    options={Teams}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Teams"
                    />
                    )}
                    onChange={(e,v) => setTeams(v)}
                />
                <Autocomplete
                    multiple
                    className={classes.form}
                    options={Specializations}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Supporter Specialization Areas"
                    />
                    )}
                    onChange={(e,v) => setSpecializations(v)}
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