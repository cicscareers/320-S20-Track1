import { Typography, Button, Modal } from "@material-ui/core";
import React, { Fragment } from "react";
import AppointmentCard from '../components/AppointmentCard';
import convertTime from "./FindSupporter/convertTime"
import Feedback from '../components/feedback'
import ViewFeedback from "../components/viewFeedback"



const Test = (props) =>{
    const handleOpenFeedbackModal = () => {
        setFeedbackModalOpen(true);
      };
    
    const handleCloseFeedbackModal = () => {
        setFeedbackModalOpen(false);
      };
    
    const [feedbackModalOpen, setFeedbackModalOpen] = React.useState(false);
    const handleOpenViewFeedbackModal = () => {
        setViewFeedbackModalOpen(true);
      };
    
    const handleCloseViewFeedbackModal = () => {
        setViewFeedbackModalOpen(false);
      };
    
    const [viewFeedbackModalOpen, setViewFeedbackModalOpen] = React.useState(false);
    return(
        <Fragment>
            <Button onClick={handleOpenFeedbackModal}>Open Feedback</Button>
            <Modal
                  open={feedbackModalOpen}
                  onClose={handleCloseFeedbackModal}
                >
                <Feedback subject = {props.subject}
                    location = {props.location}
                    medium = {props.medium}
                    time = {props.time}
                    date = {props.date}
                    supporter = {props.supporter}
                    profilepic = {props.profilepic}>
                </Feedback>
            </Modal>
            <Button onClick={handleOpenViewFeedbackModal}>View Feedback</Button>
            <Modal
                  open={viewFeedbackModalOpen}
                  onClose={handleCloseViewFeedbackModal}
                >
            <Fragment>
              <ViewFeedback 
                  rating = {5}
                  feedback = {"TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest"}
              />
            </Fragment>
            </Modal>
        </Fragment>
    );
}

export default Test;