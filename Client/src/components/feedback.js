import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import {Grid, Button, TextField} from '@material-ui/core';


const StyledRating = withStyles({
    iconFilled: {
      color: '#ff6d75',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);
  
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
  };
  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

function handlePress(){
    
}

const Feedback = (props) => {
    const supporterfed = ['Experience of meeting', 'Effectiveness of meeting']
    return (
    <Container component = 'main'>
        <Card style={{padding: 20, margin: 30}}>
          <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">How likeley are you to recommend this Supporter
                  to a friend?
              </Typography>
              <Rating
                name="customized-icons"
                defaultValue={2}
                getLabelText={(value) => customIcons[value].label}
                IconContainerComponent={IconContainer}
              />
          </Box>
          <Grid lg = {12} style={{marginLeft: 18, marginTop: 30}}>
              <Typography>Additional Comments</Typography>
              <TextField
                style = {{width: 1100}}
                id="outlined-multiline-static"
                multiline
                rows="6"
                variant="outlined"
              />
          </Grid>
          <Grid lg = {12} style = {{display: 'flex', justifyContent: 'center'}}>
              <Button href='/appointments' style={{width: 150, color: '#FFFFFF', backgroundColor: '#881c1c', marginTop: 50}} onPress={handlePress}>Submit Feedback</Button>
          </Grid>
        </Card>
    </Container>
    );
}

export default Feedback;