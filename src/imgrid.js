import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import img from './mockup3.PNG';
import img2 from './mockup2.PNG';
import img3 from './mockup.PNG';

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      
        <img src={img} height='800'/>
      
      
        <img src={img2} width='1100'/>
      
        <img src={img3} width='1100'/>
    
    </React.Fragment>
  );
}