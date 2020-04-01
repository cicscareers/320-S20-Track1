import React from 'react';
import { Input,InputGroup,TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
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
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
const divStyle = {
  
};

const rootStyle={
  width: '100%',
};

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
      start_time:"0:00",
      end_time:"23:59",
      date:today,
      modal:false,
      activeId:'1', 
      slot_min:0,
      slot:""
    };
  }
  
  handleChange = (event) => {
    const { id } = event.target;
  
		switch (id) {
			case 'type_select':
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
					activeId:'1',
					slot_min:0,
					slot:""
				});
			break;
			
			case 'rating_opt':
				femal=this.state.female;
				t=this.state.activeTab;
				rat=event.target.value;
				start=this.state.start_time;
				end=this.state.end_time;
				dat=this.state.date;
				this.setState({
					activeTab: t,
					search:"",
					female:femal,
					rating:rat,
					start_time:start,
					end_time:end,
					date:dat,
					modal:false,
					activeId:'1',
					slot_min:0,
					slot:0
				});
			break;
			
			case 'time_start':
				console.log('time start');
				femal=this.state.female;
				t=this.state.activeTab;
				rat=this.state.rating;
				start=event.target.value;
				end=this.state.end_time;
				dat=this.state.date;
				this.setState({
					activeTab: t,
					search:"",
					female:femal,
					rating:rat,
					start_time:start,
					end_time:end,
					date:dat,
					modal:false,
					activeId:'1',
					slot_min:0,
					slot:""
				});
			break;
			case 'time_end':
				console.log('time end');
				femal=this.state.female;
				t=this.state.activeTab;
				rat=this.state.rating;
				start=this.state.start_time;
				end=event.target.value;
				dat=this.state.date;
				this.setState({
					activeTab: t,
					search:"",
					female:femal,
					rating:rat,
					start_time:start,
					end_time:end,
					date:dat,
					modal:false,
					activeId:'1',
					slot_min:0,
					slot:"0"
				});
			break;
			
			case 'date_select':
				console.log('date select');
				femal=this.state.female;
				t=this.state.activeTab;
				rat=this.state.rating;
				start=this.state.start_time;
				end=this.state.end_time;
				dat=event.target.value.toString();
				this.setState({
					activeTab: t,
					search:"",
					female:femal,
					rating:rat,
					start_time:start,
					end_time:end,
					date:dat,
					modal:false,
					activeId:'1',
					slot_min:0,
					slot:""
				});
			break;
			
			default:
			break;
		}
	}

  RadioButtonsGroup(){
	  
    return (
      
      <div>
        
        <br />
        <FormControl>
        <InputLabel htmlFor="type">Type</InputLabel>
        <Select
          native
          value={this.state.female}
		  id="type_select"
          onChange={this.handleChange}
          inputProps={{
            name: 'age',
            id: 'type_select',
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
		  id="rating_opt"
          onChange={this.handleChange}
          inputProps={{
            name: 'age',
            id: 'rating_opt',
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
        id="time_start"
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
        onChange={this.handleChange}
      />
      <br/>
      <TextField
        id="time_end"
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
        onChange={this.handleChange}
      />
     <br/>
     <TextField
        id="date_select"
        label="Date"
        type="date"
        defaultValue={today.toString()}
       
        InputLabelProps={{
          shrink: true,
        }}
        onChange={this.handleChange}
      />
        

      </FormControl>
      </div>
    );
  }
  
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      var femal=this.state.female;
      var sea=this.state.search;
      var start=this.state.start_time;
      var end=this.state.end_time;
      var dat=this.state.date;
      var sm=this.state.slot_min;
      this.setState({
        activeTab: tab,
        search:sea,
        female:femal,
        start_time:start,
        end_time:end,
        date:dat,
        modal:false,
        activeId:'1',
        slot_min:sm,
        slot:""
      });
    }
  }
  onchange = e => {
    var femal=this.state.female;
    var t=this.state.activeTab;
    var sea=e.target.value;
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
      activeId:'1',
      slot_min:0,
      slot:""
    });
    
  };
  renderSupporterTab = supporter => {
    var start_time_hm=supporter.start_time.split(/[.:]/);
    var end_time_hm=supporter.end_time.split(/[.:]/);
    var start_time_ampm="AM";
    var end_time_ampm="AM";
    var start_hour=start_time_hm[0];
    var start_min=start_time_hm[1];
    var end_hour=end_time_hm[0];
    var end_min=end_time_hm[1];
    if(parseInt(start_hour)>=12){
      if(parseInt(start_hour)>12){
      
      start_hour=(parseInt(start_hour)-12).toString();
    }
      start_time_ampm="PM";
    }
    
    if(parseInt(end_hour)>=12){
      if(parseInt(end_hour)>12){
      end_hour=(parseInt(end_hour)-12).toString();
      }
      end_time_ampm="PM";
    }

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
                         <h6>   From {start_hour}:{start_min} {start_time_ampm} to {end_hour}:{end_min} {end_time_ampm}</h6>
                  </NavLink>
                </NavItem>
         
         
      </div>
    );
  };

  handleOpen=e=>{
    var femal=this.state.female;
    var t=this.state.activeTab;
    var sea=this.state.search;
    var start=this.state.start_time;
    var end=this.state.end_time;
    var dat=this.state.date;
    var sm=this.state.slot_min;
    var s=this.state.slot;
    this.setState({
      activeTab: t,
      search:sea,
      female:femal,
      start_time:start,
      end_time:end,
      date:dat,
      modal:true,
      activeId:e.target.id,
      slot_min:sm,
      slot:s
    });

  }
  handleClose=e=>{
    var femal=this.state.female;
    var t=this.state.activeTab;
    var sea=this.state.search;
    var start=this.state.start_time;
    var end=this.state.end_time;
    var dat=this.state.date;
    var sm=this.state.slot_min;
    var s=this.state.slot;
    this.setState({
      activeTab: t,
      search:sea,
      female:femal,
      start_time:start,
      end_time:end,
      date:dat,
      modal:false,
      activeId:e.target.id,
      slot_min:sm,
      slot:s
    });
  }
  handleSlot=e=>{
    var femal=this.state.female;
    var t=this.state.activeTab;
    var sea=this.state.search;
    var start=this.state.start_time;
    var end=this.state.end_time;
    var dat=this.state.date;
    var sm=e.target.value;
    var s=this.state.slot;
    this.setState({
      activeTab: t,
      search:sea,
      female:femal,
      start_time:start,
      end_time:end,
      date:dat,
      modal:false,
      activeId:e.target.id,
      slot_min:sm,
      slot:""
    });
   
  }
  handleSlotTime=e=>{
    var femal=this.state.female;
    var t=this.state.activeTab;
    var sea=this.state.search;
    var start=this.state.start_time;
    var end=this.state.end_time;
    var dat=this.state.date;
    var sm=this.state.slot_min;
    var s=e.target.value;
    this.setState({
      activeTab: t,
      search:sea,
      female:femal,
      start_time:start,
      end_time:end,
      date:dat,
      modal:false,
      activeId:e.target.id,
      slot_min:sm,
      slot:s
    });
   
  }
  renderSupporterTabContent = supporter => {
    const classes = useStyles3;
    const fil=supporters.filter(supporter => {
      return supporter.id===this.state.activeId;
    });
    let AuthButton;
    
    var fil_start_time_hm=fil.map(supporter=>{return supporter.start_time.split(/[.:]/);});
    var fil_end_time_hm=fil.map(supporter=>{return supporter.end_time.split(/[.:]/);});
    var fil_start_time_ampm="AM";
    var fil_end_time_ampm="AM";
    var fil_start_hour=fil_start_time_hm[0];
    // alert(fil_start_hour);
    
    var fil_start_min=fil_start_time_hm[1];
    // alert(fil_start_min);
    var fil_end_hour=fil_end_time_hm[0];
    var fil_end_min=fil_end_time_hm[1];
    if(parseInt(fil_start_hour)>=12){
      if(parseInt(fil_start_hour)>12){
      fil_start_hour=(parseInt(fil_start_hour)-12).toString();
      }
      fil_start_time_ampm="PM";
      
    }
    if(parseInt(fil_end_hour)>=12){
      if(parseInt(fil_end_hour)>12){
      fil_end_hour=(parseInt(fil_end_hour)-12).toString();
      }
      fil_end_time_ampm="PM";
    }
    var date= supporter.date.toLowerCase();
    var start_time_hm=supporter.start_time.split(/[.:]/);
    var end_time_hm=supporter.end_time.split(/[.:]/);
    var start_time_ampm="AM";
    var end_time_ampm="AM";
    var start_hour=start_time_hm[0];
    var start_min=start_time_hm[1];
    var end_hour=end_time_hm[0];
    var end_min=end_time_hm[1];
    if(parseInt(start_hour)>=12){
      if(parseInt(start_hour)>12){
      start_hour=(parseInt(start_hour)-12).toString();
      }
      start_time_ampm="PM";
    }
    if(parseInt(end_hour)>=12){
      if(parseInt(end_hour)>12){
      end_hour=(parseInt(end_hour)-12).toString();
      }
      end_time_ampm="PM";
    }
    if(this.state.slot_min!==0){
      const slot_filter=supporters.filter(supporter => {
        return supporter.id===this.state.activeTab;
      });
      var slot_filter_start=slot_filter.map(supporter=>{return supporter.start_time.split(":");});
      let j1=slot_filter_start[0].toString().split(",");
      var slot_filter_end=slot_filter.map(supporter=>{return supporter.end_time.split(":");});
      let j2=slot_filter_end[0].toString().split(",");
      var as_hour=parseInt(j1[0]);
      var as_min=0;
      if(slot_filter_start[1]!=="00"){
        as_min=parseInt(j1[1]);
      }
      var ae_hour=parseInt(j2[0]);
      var ae_min=0;
      if(slot_filter_end[1]!=="00"){
        ae_min=parseInt(j2[1]);
      }
      var min=parseInt(this.state.slot_min);
      var slot_start_hour=as_hour;
      var slot_start_min=as_min;
      var slot_start_time_ampm="AM";
	 
      var AuthRadio=[];
      var AuthRadio2=[];
      var AuthRadio3=[];
      var AuthRadio4=[];
	  
      var i=0;
	  var slot_end_hour = slot_start_hour;
      var slot_end_min = slot_start_min;
	  var slot_end_time_ampm="AM";
	  var adj_start_hour;
	  
	  
      while(slot_end_min/60 + slot_end_hour < ae_min/60 + ae_hour)
	  {
		  adj_start_hour = slot_start_hour;
		  if(slot_start_hour>=12){
			if(slot_start_hour>12){
				adj_start_hour=slot_start_hour-12;
			}
          slot_start_time_ampm="PM";
		  }
		
		var padded_start_min = slot_start_min.toString();
			if(padded_start_min.length === 1)
				padded_start_min = "0"+padded_start_min;
		if(min===0)
			break;
        if(min===30){	
			slot_end_min = slot_start_min+30;
			slot_end_hour = slot_start_hour+parseInt(slot_end_min/60);
			slot_end_min = slot_end_min%60;
			
			var adj_end_hour = slot_end_hour;
			if(slot_end_hour>=12)
			{
				if(slot_end_hour>12)
					adj_end_hour = slot_end_hour - 12;
				slot_end_time_ampm = "PM";
			}
			
			var padded_end_min = slot_end_min.toString();
			if(padded_end_min.length === 1)
				padded_end_min = "0"+padded_end_min;
			
			var string = adj_start_hour.toString()+":"+padded_start_min+" "+slot_start_time_ampm+" to "+(adj_end_hour).toString()+":"+padded_end_min+" "+slot_end_time_ampm;
			
			if (slot_end_hour + slot_end_min/60 > ae_hour + ae_min/60)
				break;
			
			console.log(slot_end_hour+":"+slot_end_min);
			AuthRadio[i++]=(<FormControlLabel value={string} control={<Radio />} label={string} />);
			
			slot_start_min = slot_start_min+15;
			slot_start_hour = slot_start_hour+parseInt(slot_start_min/60);
			slot_start_min = slot_start_min%60;
			
        }
		
        if(min===60){
			slot_end_min = slot_start_min;
			slot_end_hour = slot_start_hour +1;
			
			adj_end_hour = slot_end_hour;
			if(slot_end_hour>=12)
			{
				if(slot_end_hour>12)
					adj_end_hour = slot_end_hour - 12;
				slot_end_time_ampm = "PM";
			}
			
			padded_end_min = slot_end_min.toString();
			if(padded_end_min.length === 1)
				padded_end_min = "0" + padded_end_min;
			
			string = slot_start_hour.toString()+":"+padded_start_min+" "+slot_start_time_ampm+" to "+(adj_end_hour).toString()+":"+padded_end_min+" "+slot_end_time_ampm;
			
			if (slot_end_hour + slot_end_min/60 > ae_hour + ae_min/60)
				break;
			
			AuthRadio[i++]=(<FormControlLabel value={string} control={<Radio />} label={string} />);
			
      slot_start_min = slot_start_min+15;
			slot_start_hour = slot_start_hour+parseInt(slot_start_min/60);
			slot_start_min = slot_start_min%60;
			
        }
		
        if(min===90){
			slot_end_min = slot_start_min+90;
			slot_end_hour = slot_start_hour+parseInt(slot_end_min/60);
			slot_end_min = slot_end_min%60;
			
			adj_end_hour = slot_end_hour;
			if(slot_end_hour>=12)
			{
				if(slot_end_hour>12)
					adj_end_hour = slot_end_hour - 12;
				slot_end_time_ampm = "PM";
			}
			
			padded_end_min = slot_end_min.toString();
			if(padded_end_min.length === 1)
				padded_end_min = "0" + padded_end_min;
			
			string = adj_start_hour.toString()+":"+padded_start_min+" "+slot_start_time_ampm+" to "+(adj_end_hour).toString()+":"+padded_end_min+" "+slot_end_time_ampm;
			if (slot_end_hour + slot_end_min/60 > ae_hour + ae_min/60)
				break;
			AuthRadio[i++]=(<FormControlLabel value={string} control={<Radio />} label={string} />);
      slot_start_min = slot_start_min+15;
			slot_start_hour = slot_start_hour+parseInt(slot_start_min/60);
			slot_start_min = slot_start_min%60;
			
          
        }
		
        if(min===120){
			slot_end_min = slot_start_min;
			slot_end_hour = slot_start_hour + 2;
			
			adj_end_hour = slot_end_hour;
			if(slot_end_hour>=12)
			{
				if(slot_end_hour>12)
					adj_end_hour = slot_end_hour - 12;
				slot_end_time_ampm = "PM";
			}
			
			padded_end_min = slot_end_min.toString();
			if(padded_end_min.length === 1)
				padded_end_min = "0" + padded_end_min;
			
			string = slot_start_hour.toString()+":"+padded_start_min+" "+slot_start_time_ampm+" to "+(adj_end_hour).toString()+":"+padded_end_min+" "+slot_end_time_ampm;
			
			if (slot_end_hour + slot_end_min/60 > ae_hour + ae_min/60)
				break;
			
			AuthRadio[i++]=(<FormControlLabel value={string} control={<Radio />} label={string} />);
			
			slot_start_min = slot_start_min+15;
			slot_start_hour = slot_start_hour+parseInt(slot_start_min/60);
			slot_start_min = slot_start_min%60;
          
        }
      }
	  
      AuthButton=(<FormControl component="fieldset">
      <FormLabel component="legend">Slots open</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={this.state.slot} onChange={this.handleSlotTime}>
        {AuthRadio}
      </RadioGroup>
    </FormControl>); 
    }
    let ModalToBeShown;
    if(this.state.slot!=""){
      ModalToBeShown=( <div className={classes.paper} style={{textAlign:'center'}}>
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
        <h6>Time: {this.state.slot}</h6>
        <h6>Location:{fil.map(supporter => {
        return supporter.location;
      })}</h6>
       <textarea style={{width:'70%',height:'80%'}} placeholder="Please write anything you want to share to supporter"></textarea>
       <br/>
        <Button style={{float:'right',marginRight:'10px'}}>Confirm appointment</Button>
        &nbsp;
      </p>
      <br/>
      
    </div>);
    }
    else{
      ModalToBeShown=(<div className={classes.paper} style={{textAlign:'center'}}>
        <br/>
        <p id="transition-modal-description">
          Please Select a Slot.
        </p>
      </div>)
    }
    return (
      
              
            
             
                <TabPane tabId={supporter.id} style={{border:'solid 3px black',textAlign:'center'}}>
                  
                  <br/>
                  <h4>{supporter.name.substring(0, 60)}</h4>
    
    <h6>Helps in: {supporter.type}</h6>
                  <h6>Date: {date}</h6>
                  <h6>Available from {start_hour}:{start_min} {start_time_ampm} to {end_hour}:{end_min} {end_time_ampm}</h6>
    <h6>Rating: {supporter.rating}</h6>
                  <br/>
                  <InputLabel htmlFor="type">Slot Duration</InputLabel>
        <Select
          native
          value={this.state.slot_min}
          onChange={this.handleSlot}
          inputProps={{
            name: 'age',
            id: 'slot',
          }}
        >
          <option aria-label="None" value={0} />
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>
          <option value={90}>1.5 hour</option>
          <option value={120}>2 hour</option>
        </Select>
        <br/>
        <br/>
        {AuthButton}
        <br/>
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
            {ModalToBeShown}
            
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
          const s_start_time=supporter.start_time;
        var s_start_hoursMinutes = s_start_time.toString().split(/[.:]/);

        var s_start_hours = parseInt(s_start_hoursMinutes[0], 10);
        var s_start_minutes = s_start_hoursMinutes[1] ? parseInt(s_start_hoursMinutes[1], 10) : 0;
        const s_start_exact_time= s_start_hours + (s_start_minutes/100);
        const s_end_time=supporter.end_time;
        var s_end_hoursMinutes = s_end_time.toString().split(/[.:]/);
        var s_end_hours = parseInt(s_end_hoursMinutes[0], 10);
        var s_end_minutes = s_end_hoursMinutes[1] ? parseInt(s_end_hoursMinutes[1], 10) : 0;
        const s_end_exact_time= s_end_hours + (s_end_minutes/100);
        var two_three=false;
        if(end_exact_time==23.59){
          two_three=true;
        }
          return (s_end_exact_time>start_exact_time)&&((s_end_exact_time<=end_exact_time)||(s_end_exact_time>end_exact_time))&&(start_exact_time<=end_exact_time);
        });
        
        const filteredSupportersBySearch = filteredSupportersByTime.filter(supporter => {
          return supporter.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
        // const classes = useStyles();
        return (
          <div style={{overflow:'hidden'}}>
          <div style={rootStyle}>
      <ExpansionPanel style={{transform:'rotateZ(360deg)',float:'right'}}>
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
          <InputGroup style={{width:'25.8%',borderRight:'solid 1px black'}}onChange={this.onchange}>
              
        <Input placeholder="Search Supporter" />
      </InputGroup>
              
          <Row>
            <Col xs="6" sm="4" md="4" style={{overflowY:'scroll',height:'561px',borderRight:'solid 1px black'}}>
              <Nav tabs vertical pills >
              {filteredSupportersBySearch.map(supporter => {
                return this.renderSupporterTab(supporter);
              })}
              </Nav>
            </Col>
            <Col xs="6" sm="6" md="8" style={{overflowY:'auto',height:'431px',width:'60%'}}>
              <TabContent activeTab={this.state.activeTab} >
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
