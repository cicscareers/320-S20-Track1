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
// import supporters from "C:\Program Files\nodejs\my-app\src\supporters.json";
const divStyle = {
  
};
const rootStyle={
  width: '100%',
};
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
export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      search:""
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        search:""
      });
    }
  }
  onchange = e => {
    var tab= this.state.activeTab;
    this.setState({
      activeTab:tab,
      search:e.target.value
  });
  };
  renderSupporterTab = supporter => {
    const search = this.state.search;
    var type = supporter.type.toLowerCase();
    var date= supporter.date.toLowerCase();
    var start_time= supporter.start_time.toLowerCase();
    var end_time= supporter.end_time.toLowerCase();
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
                  </NavLink>
                </NavItem>
         
         
      </div>
    );
  };
  renderSupporterTabContent = supporter => {
    const search = this.state.search;
    var type = supporter.type.toLowerCase();
    var date= supporter.date.toLowerCase();
    var start_time= supporter.start_time.toLowerCase();
    var end_time= supporter.end_time.toLowerCase();
    
    
    /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
        return null
    }*/
  
    return (
      
              
            
             
                <TabPane tabId={supporter.id}>
                
                  <h4>{supporter.name.substring(0, 60)}</h4>
                  <h6>Available from {supporter.start_time.substring(0,16)} to {supporter.end_time.substring(0,16)}</h6>
                  <h6>Date: ......</h6>
                  <Button>Create appointment</Button>
                </TabPane>
              
         
         
      
    );
  };
      render() {
        const  search  = this.state.search;
        
        const filteredSupporters = supporters.filter(supporter => {
          return supporter.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
        // const classes = useStyles();
        return (
          <div>
          <div style={rootStyle}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Expansion Panel 1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      
    </div>
          <div style={divStyle}> 
          <InputGroup onChange={this.onchange}>
              
        <Input placeholder="username" />
      </InputGroup>
              
          <Row>
            <Col xs="6" sm="4" md="4">
              <Nav tabs vertical pills>
              {filteredSupporters.map(supporter => {
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
                {filteredSupporters.map(supporter => {
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