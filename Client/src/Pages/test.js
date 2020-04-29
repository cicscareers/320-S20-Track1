import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import AppointmentCard from '../components/AppointmentCard';
import convertTime from "./FindSupporter/convertTime"

function convertDate(time, duration){
    var hours = parseInt(time.substring(11,13)) * 60;
    var minutes = parseInt(time.substring(14,16));
    return convertTime(hours + minutes + duration);
  }

const Test = (props) =>{
    return(
        <Fragment>
            <br/><br/><br/>
            <AppointmentCard
                upcoming = {true}
                role = {'student'}
                subject = {'subject'}
                location = {'ya ass'}
                medium = {'in person'}
                start = {'04/17/2020 13:00'}
                end = {'04/17/2020 13:30'}
                date = {'04/17/2020'}
                supporter = {'Bill Gates'}
                student = {'Kyle O'}
                supporterProfilePic = {""}
                studentProfilePic = {""}
                comments = {'pls'}
            />
        </Fragment>
    );
}

export default Test;