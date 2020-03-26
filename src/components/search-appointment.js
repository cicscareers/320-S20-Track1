import React from 'react';
import { Input,InputGroup,TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import supporters from "./supporters.json";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import TextField from '@material-ui/core/TextField';

// import supporters from "C:\Program Files\nodejs\my-app\src\supporters.json";
const divStyle = {
  
};

const rootStyle={
  width: '100%',
};

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const useStyles1 = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
const useStyles3 = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// const hdStyle={
//   fontSize: theme.typography.pxToRem(15),
//   fontWeight: theme.typography.fontWeightRegular,
// };
// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
// }));
// export var RadioButtonsGroup=function(){
//   const [value, setValue] = React.useState('female');

//   const handleChange = event => {
//     setValue(event.target.value);
//   };

//   return (
//     <FormControl component="fieldset">
//       <FormLabel component="legend">Gender</FormLabel>
//       <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
//         <FormControlLabel value="female" control={<Radio />} label="Female" />
//         <FormControlLabel value="male" control={<Radio />} label="Male" />
//         <FormControlLabel value="other" control={<Radio />} label="Other" />
//         <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
//       </RadioGroup>
//     </FormControl>
//   );
// }
var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today =yyyy+'-'+mm+'-'+dd;
export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      search:"",
      female:"",
      rating:0,
      start_time:0.00,
      end_time:23.59,
      date:today,
      modal:false,
      activeId:'1'
    };
  }
  handleChange=event=>{
    var femal=event.target.value;
    var t=this.state.activeTab;
    var rat=this.state.rating;
    var start=this.state.start_time;
    var end=this.state.end_time;
    var dat=this.state.date;
    this.setState({
      activeTab: t,
      search:"",
      female:femal,
      rating:rat,
      start_time:start,
      end_time:end,
      date:dat,
      modal:false,
      activeId:'1'
    });
    
  };
  handleChange1=event=>{
    var femal=this.state.female;
    var t=this.state.activeTab;
    var rat=event.target.value;
    var start=this.state.start_time;
    var end=this.state.end_time;
    var dat=this.state.date;
    this.setState({
      activeTab: t,
      search:"",
      female:femal,
      rating:rat,
      start_time:start,
      end_time:end,
      date:dat,
      modal:false,
      activeId:'1'
    });
    
  };
  handleChange2=event=>{
    var femal=this.state.female;
    var t=this.state.activeTab;
    var rat=this.state.rating;
    var start=event.target.value;
    var end=this.state.end_time;
    var dat=this.state.date;
    this.setState({
      activeTab: t,
      search:"",
      female:femal,
      rating:rat,
      start_time:start,
      end_time:end,
      date:dat,
      modal:false,
      activeId:'1'
    });
    
  };
  handleChange3=event=>{
    var femal=this.state.female;
    var t=this.state.activeTab;
    var rat=this.state.rating;
    var start=this.state.start_time;
    var end=event.target.value;
    var dat=this.state.date;
    this.setState({
      activeTab: t,
      search:"",
      female:femal,
      rating:rat,
      start_time:start,
      end_time:end,
      date:dat,
      modal:false,
      activeId:'1'
    });
    
  };
  handleChange4=event=>{
    var femal=this.state.female;
    var t=this.state.activeTab;
    var rat=this.state.rating;
    var start=this.state.start_time;
    var end=this.state.end_time;
    var dat=event.target.value.toString();
    this.setState({
      activeTab: t,
      search:"",
      female:femal,
      rating:rat,
      start_time:start,
      end_time:end,
      date:dat,
      modal:false,
      activeId:'1'
    });
    
  }
  RadioButtonsGroup(){
    // const [value, setValue] = React.useState('female');
  
    // const handleChange = event => {
    //   setValue(event.target.value);
    // };
//     var today = new Date();
// var dd = today.getDate();

// var mm = today.getMonth()+1; 
// var yyyy = today.getFullYear();
// if(dd<10) 
// {
//     dd='0'+dd;
// } 

// if(mm<10) 
// {
//     mm='0'+mm;
// } 
// today = mm+'-'+dd+'-'+yyyy;
    return (
      
      <div>
        
        <br />
        <FormControl>
        <InputLabel htmlFor="type">Type</InputLabel>
        <Select
          native
          value={this.state.female}
          onChange={this.handleChange}
          inputProps={{
            name: 'age',
            id: 'type',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"Interview Coaching"}>Interview Coaching</option>
          <option value={"Salary Negotiation"}>Salary Negotiation</option>
          <option value={"Job Search"}>Job Search</option>
          <option value={"Resume/CV"}>Resume/CV</option>
        </Select>
       <br/>
        <InputLabel htmlFor="Rating"> <br/><br/><br/><br/><br/>
        Minimum Rating</InputLabel>
        <Select
          native
          value={this.state.rating}
          onChange={this.handleChange1}
          inputProps={{
            name: 'age',
            id: 'rating',
          }}
        >
          <option aria-label="None" value={0} />
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
         
        </Select>
        <br/>
        <TextField
        id="time"
        label="Start Time"
        type="time"
        defaultValue="00:00"
        style={{ marginLeft:'3px',
          marginRight:'3px',
          width: 200}}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={this.handleChange2}
      />
      <br/>
      <TextField
        id="time"
        label="End Time"
        type="time"
        defaultValue="23:59"
        style={{ marginLeft:'3px',
          marginRight:'3px',
          width: 200}}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={this.handleChange3}
      />
     <br/>
     <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue={today.toString()}
       
        InputLabelProps={{
          shrink: true,
        }}
        onChange={this.handleChange4}
      />
        {/* <InputLabel htmlFor="Rating"> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        Start-Time</InputLabel>
        <Select
          native
          value={this.state.rating}
          onChange={this.handleChange1}
          inputProps={{
            name: 'age',
            id: 'start-time',
          }}
        >
          <option aria-label="None" value={0} />
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </Select> */}

      </FormControl>
      </div>
    );
  }
  
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      var femal=this.state.female;
      var t=this.state.activeTab;
      var sea=this.state.search;
      var rat=this.state.rating;
      var start=this.state.start_time;
      var end=this.state.end_time;
      var dat=this.state.date;
      this.setState({
        activeTab: tab,
        search:sea,
        female:femal,
        start_time:start,
        end_time:end,
        date:dat,
        modal:false,
        activeId:'1'
      });
    }
  }
  onchange = e => {
    var femal=this.state.female;
    var t=this.state.activeTab;
    var sea=e.target.value;
    var rat=this.state.rating;
    var start=this.state.start_time;
    var end=this.state.end_time;
    var dat=this.state.date;
    this.setState({
      activeTab: t,
      search:sea,
      female:femal,
      start_time:start,
      end_time:end,
      date:dat,
      modal:false,
      activeId:'1'
    });
    
  };
  renderSupporterTab = supporter => {
    const search = this.state.search;
    var type = supporter.type.toLowerCase();
    var date= supporter.date.toLowerCase();
    var start_time_hour=Math.floor(supporter.start_time);
    var start_time_ampm="AM";
    var end_time_ampm="AM";
    if(start_time_hour>12){
      start_time_hour=start_time_hour-12;
      start_time_ampm="PM";
    }
    var start_time_min= (supporter.start_time-Math.floor(supporter.start_time)).toFixed(2).toString();
    var start_time_min1=start_time_min.slice(start_time_min.indexOf(".")+1,start_time_min.indexOf(".")+2);
    var end_time_hour=Math.floor(supporter.end_time);
    if(end_time_hour>12){
      end_time_hour=end_time_hour-12;
      end_time_ampm="PM";
    }
    var end_time_min= (supporter.end_time-Math.floor(supporter.end_time)).toFixed(2).toString();
    var end_time_min1=end_time_min.slice(end_time_min.indexOf(".")+1,end_time_min.indexOf(".")+2);

    /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
        return null
    }*/

    return (
      <div>
          
              
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeTab === supporter.id})}
                    onClick={() => {
                      this.toggle(supporter.id);
                    }}
                  >
                   <h3>{supporter.name}</h3>
                         <h6>   Date:{supporter.date}</h6>
                         <h6>   From {start_time_hour}:{start_time_min1}0 {start_time_ampm} to {end_time_hour}:{end_time_min1}0 {end_time_ampm}</h6>
                  </NavLink>
                </NavItem>
         
         
      </div>
    );
  };
  // transitionsModal(supporter){
  //   const classes = useStyles3;
  //   // const[open,setOpen]=React.useState(false);
  //   // const handleOpen = e => {
  //   //   alert(e.target.id);
  //   //   setOpen(true);
  //   // };
  
  //   // const handleClose = () => {
  //   //   setOpen(false);
  //   // };
  //   var start_time_hour=Math.floor(supporter.start_time);
  //   var start_time_ampm="AM";
  //   var end_time_ampm="AM";
  //   if(start_time_hour>12){
  //     start_time_hour=start_time_hour-12;
  //     start_time_ampm="PM";
  //   }
  //   var start_time_min= (supporter.start_time-Math.floor(supporter.start_time)).toFixed(2).toString();
  //   var start_time_min1=start_time_min.slice(start_time_min.indexOf(".")+1,start_time_min.indexOf(".")+2);
  //   var end_time_hour=Math.floor(supporter.end_time);
  //   if(end_time_hour>12){
  //     end_time_hour=end_time_hour-12;
  //     end_time_ampm="PM";
  //   }
  //   var end_time_min= (supporter.end_time-Math.floor(supporter.end_time)).toFixed(2).toString();
  //   var end_time_min1=end_time_min.slice(end_time_min.indexOf(".")+1,end_time_min.indexOf(".")+2);
  //   return (
  //     <div>
  //       <Button type="button" id={supporter.id} onClick={handleOpen}>
  //        Create New Appointment
  //       </Button>
  //       <Modal
  //         aria-labelledby="transition-modal-title"
  //         aria-describedby="transition-modal-description"
  //         className={classes.modal}
  //         open={open}
  //         onClose={handleClose}
  //         closeAfterTransition
  //         BackdropComponent={Backdrop}
  //         BackdropProps={{
  //           timeout: 500
  //         }}
  //       >
  //         <Fade in={open}>
  //           <div className={classes.paper}>
  //       <h2 id="transition-modal-title">Appointment Confirmation</h2>
  //             <p id="transition-modal-description">
  //               Supporter-Name:{supporter.name}
  //               Helps-In:{supporter.type}
  //               Date:{supporter.date}
  //               Time:{start_time_hour}:{start_time_min1}0 {start_time_ampm} to {end_time_hour}:{end_time_min1}0 {end_time_ampm}
  //               Location:{supporter.location}
  //               <Button style={{float:'right',marginRight:'10px'}}>Confirm appointment</Button>
  //             </p>
  //           </div>
  //         </Fade>
  //       </Modal>
  //     </div>
  //   );
  // }
  handleOpen=e=>{
    var femal=this.state.female;
    var t=this.state.activeTab;
    var sea=this.state.search;
    var rat=this.state.rating;
    var start=this.state.start_time;
    var end=this.state.end_time;
    var dat=this.state.date;
    this.setState({
      activeTab: t,
      search:sea,
      female:femal,
      start_time:start,
      end_time:end,
      date:dat,
      modal:true,
      activeId:e.target.id
    });
    // alert(e.target.id);
  }
  handleClose=e=>{
    var femal=this.state.female;
    var t=this.state.activeTab;
    var sea=this.state.search;
    var rat=this.state.rating;
    var start=this.state.start_time;
    var end=this.state.end_time;
    var dat=this.state.date;
    this.setState({
      activeTab: t,
      search:sea,
      female:femal,
      start_time:start,
      end_time:end,
      date:dat,
      modal:false,
      activeId:e.target.id
    });
  }
  renderSupporterTabContent = supporter => {
    const classes = useStyles3;
    // const[open,setOpen]=React.useState(false);
    // // const handleOpen = () => {
    // //   // alert(e.target.id);
    // //   setOpen(true);
    // // };
  
    // // const handleClose = () => {
    // //   setOpen(false);
    // // };
    const fil=supporters.filter(supporter => {
      return supporter.id==this.state.activeId;
    });
    var fil_start_time=fil.map(supporter=>{return supporter.start_time});
    var fil_end_time=fil.map(supporter=>{return supporter.end_time});
    var fil_start_time_hour=Math.floor(fil_start_time);
    var fil_start_time_ampm="AM";
    var fil_end_time_ampm="AM";
    if(fil_start_time_hour>12){
      fil_start_time_hour=fil_start_time_hour-12;
      fil_start_time_ampm="PM";
    }
    var fil_start_time_min= (fil_start_time-Math.floor(fil_start_time)).toFixed(2).toString();
    var fil_start_time_min1=fil_start_time_min.slice(fil_start_time_min.indexOf(".")+1,fil_start_time_min.indexOf(".")+2);
    var fil_end_time_hour=Math.floor(fil_end_time);
    if(fil_end_time_hour>12){
      fil_end_time_hour=fil_end_time_hour-12;
      fil_end_time_ampm="PM";
    }
    var fil_end_time_min= (fil_end_time-Math.floor(fil_end_time)).toFixed(2).toString();
    var fil_end_time_min1=fil_end_time_min.slice(fil_end_time_min.indexOf(".")+1,fil_end_time_min.indexOf(".")+2);
    const search = this.state.search;
    var type = supporter.type.toLowerCase();
    var date= supporter.date.toLowerCase();
    var start_time_hour=Math.floor(supporter.start_time);
    var start_time_ampm="AM";
    var end_time_ampm="AM";
    if(start_time_hour>12){
      start_time_hour=start_time_hour-12;
      start_time_ampm="PM";
    }
    var start_time_min= (supporter.start_time-Math.floor(supporter.start_time)).toFixed(2).toString();
    var start_time_min1=start_time_min.slice(start_time_min.indexOf(".")+1,start_time_min.indexOf(".")+2);
    var end_time_hour=Math.floor(supporter.end_time);
    if(end_time_hour>12){
      end_time_hour=end_time_hour-12;
      end_time_ampm="PM";
    }
    var end_time_min= (supporter.end_time-Math.floor(supporter.end_time)).toFixed(2).toString();
    var end_time_min1=end_time_min.slice(end_time_min.indexOf(".")+1,end_time_min.indexOf(".")+2);
    
    /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
        return null
    }*/
  
    return (
      
              
            
             
                <TabPane tabId={supporter.id} style={{border:'solid 3px black',textAlign:'center'}}>
                  
                  <br/>
                  <h4>{supporter.name.substring(0, 60)}</h4>
    
    <h6>Helps in: {supporter.type}</h6>
                  <h6>Date: {date}</h6>
                  <h6>Available from {start_time_hour}:{start_time_min1}0 {start_time_ampm} to {end_time_hour}:{end_time_min1}0 {end_time_ampm}</h6>
    <h6>Rating: {supporter.rating}</h6>
                  <br/>
                  <Button type="button" id={supporter.id} onClick={this.handleOpen}>
         Create New Appointment
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.modal}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={this.state.modal}style={{marginTop:'10%',width:'50%',marginLeft:'27%',backgroundColor:'white',text:'black'}}>
            <div className={classes.paper} style={{textAlign:'center'}}>
              <br/>
        <h4 id="transition-modal-title" style={{borderBottom:'solid 1px,black'}}>Appointment Confirmation</h4>
              <p id="transition-modal-description">
                <h6>Supporter-Name:{fil.map(supporter => {
                return supporter.name;
              })}</h6>
                <h6>Helps-In:{fil.map(supporter => {
                return supporter.type;
              })}</h6>
                <h6>Date:{fil.map(supporter => {
                return supporter.date;
              })}</h6>
                <h6>Time:{fil_start_time_hour}:{fil_start_time_min1}0 {fil_start_time_ampm} to {fil_end_time_hour}:{fil_end_time_min1}0 {fil_end_time_ampm}</h6>
                <h6>Location:{fil.map(supporter => {
                return supporter.location;
              })}</h6>
               <textarea style={{width:'70%',height:'80%'}} placeholder="Please write anything you want to share to supporter"></textarea>
               <br/>
                <Button style={{float:'right',marginRight:'10px'}}>Confirm appointment</Button>
                &nbsp;
              </p>
              <br/>
              
            </div>
            
          </Fade>
        </Modal>
                  <br/>
                  <br/>
                  <br/>
                </TabPane>
              
         
         
      

    );
  };
      render() {
        const  search  = this.state.search;
        const  female  = this.state.female;
        const  rating  = this.state.rating;
        const  date = this.state.date;
        // alert(date);
        const start_time=this.state.start_time;
        var start_hoursMinutes = start_time.toString().split(/[.:]/);
        var start_hours = parseInt(start_hoursMinutes[0], 10);
        var start_minutes = start_hoursMinutes[1] ? parseInt(start_hoursMinutes[1], 10) : 0;
        const start_exact_time= start_hours + (start_minutes/100);
        const end_time=this.state.end_time;
        var end_hoursMinutes = end_time.toString().split(/[.:]/);
        var end_hours = parseInt(end_hoursMinutes[0], 10);
        var end_minutes = end_hoursMinutes[1] ? parseInt(end_hoursMinutes[1], 10) : 0;
        const end_exact_time= end_hours + (end_minutes/100);
        // alert(parseInt(end_time.toString()));
        // alert(end_exact_time);
        const filteredSupportersByRating = supporters.filter(supporter => {
          return supporter.rating>=rating;
        });
        const filteredSupportersByType = filteredSupportersByRating.filter(supporter => {
          return supporter.type.toLowerCase().indexOf(female.toLowerCase()) !== -1;
        });
        const filteredSupportersByDate = filteredSupportersByType.filter(supporter => {
          return !(supporter.date.localeCompare(date.toString()));
        });
        const filteredSupportersByTime = filteredSupportersByDate.filter(supporter => {
          // alert(supporter.end_time);
          return (supporter.start_time>=start_exact_time)&&(supporter.end_time<=end_exact_time);
        });
        const filteredSupportersBySearch = filteredSupportersByTime.filter(supporter => {
          return supporter.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
        // const classes = useStyles();
        return (
          <div style={{overflow:'hidden'}}>
          <div style={rootStyle}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filters</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
           
           {this.RadioButtonsGroup()}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      
    </div>
          <div style={divStyle}> 
          <InputGroup style={{width:'31.75%',borderRight:'solid 1px black'}}onChange={this.onchange}>
              
        <Input placeholder="Search Supporter" />
      </InputGroup>
              
          <Row>
            <Col xs="6" sm="4" md="4">
              <Nav tabs vertical pills style={{borderRight:'solid 1px black',overflowY:'auto'}}>
               
              {filteredSupportersBySearch.map(supporter => {
                return this.renderSupporterTab(supporter);
              })}
              </Nav>
            </Col>
            <Col xs="6" sm="6" md="6">
              <TabContent activeTab={this.state.activeTab}>
                {/* <TabPane tabId="1">
                  <h4>Chinmay Patil</h4>
                  <h6>Available from 11:30 to 12</h6>
                  <h6>Date: ......</h6>
                  <Button>Create appointment</Button>
                </TabPane>
                <TabPane tabId="2">
                <h4>Dhruvil Gala</h4>
                  <h6>Available from 12 to 1</h6>
                  <h6>Date: ......</h6>
                  <Button>Create appointment</Button>
                </TabPane> */}
                {filteredSupportersBySearch.map(supporter => {
                return this.renderSupporterTabContent(supporter);
              })}
              </TabContent>
            </Col>
          </Row>
          </div>
          </div>
        )
      }
}