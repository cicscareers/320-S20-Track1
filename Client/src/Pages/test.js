import { Typography, Button, Modal } from "@material-ui/core";
import React, { Fragment } from "react";
import AppointmentCard from '../components/AppointmentCard';
import convertTime from "./FindSupporter/convertTime"
import Feedback from '../components/feedback'
import ViewFeedback from "../components/viewFeedback"
import Cancel from '../components/cancelAppt'



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

    const handleOpenAppointmentModal = () => {
        setCancelAppointmentModalOpen(true);
      };
    
    const handleCloseAppointmentModal = () => {
        setCancelAppointmentModalOpen(false);
      };
    const [cancelAppointmentModalOpen, setCancelAppointmentModalOpen] = React.useState(false);

    return(
        <Fragment>
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
            </Fragment>
            <Fragment>
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
            <Fragment>
              <Button
                      onClick={handleOpenAppointmentModal}
                    >
                      Cancel Appointment
                  </Button>
                  <Modal
                  open={cancelAppointmentModalOpen}
                  onClose={handleCloseAppointmentModal}
                >
                  <Cancel supporter="me" appt_id={1}/>
                </Modal>
            </Fragment>
            
        </Fragment>
    );
}

export default Test;