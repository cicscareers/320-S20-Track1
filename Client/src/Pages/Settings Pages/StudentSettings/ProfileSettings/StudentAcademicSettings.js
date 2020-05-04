import {
  makeStyles,
  Typography,
  Button,
  Container,
  TextField,
  Grid,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
    align: "center",
    padding: 4,
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(2),
    align: "center",
  },
  autoComplete: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
}));
function extractColleges(col) {
  if (col === undefined) {
    return [];
  }
  var arr = [];
  for (let i = 0; i < col["colleges"].length; i++) {
    arr.push(col["colleges"][i]["college"]);
  }
  return arr;
}
function extractMinors(min) {
  if (min === undefined) {
    return [];
  }
  var arr = [];
  for (let i = 1; i < min["minors"].length; i++) {
    arr.push(min["minors"][i]["minor"]);
  }
  return arr;
}
function extractMajors(maj) {
  if (maj === undefined) {
    return [];
  }
  var arr = [];
  for (let i = 1; i < maj["majors"].length; i++) {
    arr.push(maj["majors"][i]["major"]);
  }
  return arr;
}
const AcademicInformation = (props) => {
  const classes = useStyles();
  
  const { settings } = props;
  console.log(settings.college)
  const [college, setColleges] = useState([]);
  const [majors, setMajors] = useState([]);
  const [minors, setMinors] = useState([]);
  const [grad_year, setGradYear] = useState("");
  const [grad_student, setGradStudent] = useState(false);
  const [collegesList, setCollegesList] = React.useState([]);
  const [majorsList, setMajorsList] = React.useState([]);
  const [minorsList, setMinorsList] = React.useState([]);
  const [loaded, setLoaded] = useState(false);
  const cookies = new Cookies();
  const id = sessionStorage.getItem("id")
  const url =
  "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/students/" +
    id;
  const gradYearList = [
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ];
  const collegeURL =
    "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/colleges";
  const majorsURL =
    "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/majors";
  const minorsURL =
    "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/table/minors";
  const patchURL =
  "https://7jdf878rej.execute-api.us-east-2.amazonaws.com/test/users/students/" +
  id;
  function handleSubmit() {
    console.log(college)
    
    fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        first_name: settings.firstName,
        bio: settings.bio,
        college: college,
        email: settings.email,
        gender: settings.gender,
        grad_student: settings.grad_student,
        grad_year: grad_year,
        last_name: settings.lastName,
        majors: majors,
        minors: minors,
        phone: settings.phoneNumber,
        picture: settings.picture,
        preferred_name: settings.prefName,
        pronouns: settings.pronouns,
        resume: settings.resume,
        statusCode: settings.statusCode,
        colleges: [],
        links: []
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        //window.location.reload(false)
      });
  }
  useEffect(() => {
    setLoaded(false);
    Promise.all([
      fetch(url),
      fetch(collegeURL),
      fetch(majorsURL),
      fetch(minorsURL),
    ])
      .then(([res1, res2, res3, res4]) => {
        return Promise.all([
          res1.json(),
          res2.json(),
          res3.json(),
          res4.json(),
        ]);
      })
      .then(([res1, res2, res3, res4]) => {
        //console.log(extractColleges(res2));
        setCollegesList(extractColleges(res2));
        //console.log(extractMajors(res3));
        setMajorsList(extractMajors(res3));
        setMinorsList(extractMinors(res4));
        setColleges(res1.college ? res1.college : []);
        setMajors(res1.major ? res1.major : []);
        setMinors(res1.minor ? res1.minor : []);
        setGradYear(res1.grad_year.toString());
        setGradStudent(res1.grad_student);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        //setError(true);
        setLoaded(true);
        console.log("Error Connecting to API");
      });
  }, []);
  //console.log(minors);
  //console.log(majors);
  //console.log(college);
  //console.log(grad_year);
  //console.log(Array.isArray(majors));
  //console.log(grad_student);
  if (!loaded) {
    return (
      <div align="center">
        <br></br>
        <Typography variant="h4">Loading...</Typography>
        <br></br>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Academics
        </Typography>
        <form className={classes.form}>
          <Autocomplete
            multiple
            className={classes.inputs}
            id="tags-outlined"
            loading={loaded}
            options={collegesList}
            defaultValue={college}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Colleges" />
            )}
            onChange={(e, v) => setColleges(v)}
          />
          <br></br>
          <Autocomplete
            multiple
            className={classes.inputs}
            id="tags-outlined"
            loading={loaded}
            options={majorsList}
            defaultValue={majors}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Majors" />
            )}
            onChange={(e, v) => setMajors(v)}
          />
          <br></br>
          <Autocomplete
            multiple
            className={classes.inputs}
            id="tags-outlined"
            options={minorsList}
            defaultValue={minors}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Minors" />
            )}
            onChange={(e, v) => setMinors(v)}
          />
          <br></br>
          <Autocomplete
            className={classes.inputs}
            id="grad_year"
            defaultValue={grad_year}
            options={gradYearList}
            loading={loaded}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Graduation Year"
              />
            )}
            onChange={(e, v) => setGradYear(v)}
          />
          <br></br>
          <FormControlLabel
            control={
              <Checkbox
                checked={grad_student}
                color="primary"
                onChange={() => setGradStudent(!grad_student)}
              />
            }
            label="Are you an MS or PhD student?"
          />
          <br></br>
          <Button
            margin="normal"
            form
            className={classes.button}
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
};
export default AcademicInformation;
