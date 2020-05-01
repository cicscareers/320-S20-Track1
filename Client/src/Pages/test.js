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
                <Feedback 
                    appt_id = {1}
                >
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
                  feedback = {"TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest"}
              />
            </Fragment>
            </Modal>
        </Fragment>
    );
}

export default Test;