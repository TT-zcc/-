import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ButtonBox } from './dashboard/ButtonBox';
import { HeadButton } from './dashboard/HeadButton'
import { ModalBox } from './dashboard/ModalBox'
import { ModalInput } from './dashboard/ModalInput'
import { ModalButton } from './dashboard/ModalButton'
import { CreateModal } from './dashboard/CreateModal'
import { DashboardMainBox } from './dashboard/DashboardMainBox';
import { PresentationText } from './dashboard/PresentationText';
import { OnePresentationBox } from './dashboard/OnePresentationBox';
import { ThumbnailBox } from './dashboard/ThumbnailBox';
import { InformationBox } from './dashboard/InformationBox';
import { PresentationBox } from './dashboard/PresentationBox';
import CreatePresentation from './dashboard/CreatePresentation'
import { useDispatch } from 'react-redux';
import { SetPresentationId } from './rootReducer';
import Logout from './dashboard/Logout'
import Open from './Open'
import Close from './Close'

function Dashboard () {
  // Retrieve the token stored locally
  const token = localStorage.getItem('token');
  // Get navigation functionality for routing
  const navigate = useNavigate();
  // State management: control the opening and closing of the modal
  const [open, setOpen] = useState(false);
  // State management: store all user presentations
  const [presentations, setPresentations] = useState([]);
  // State management: store the name and description of the new presentation
  const [presentationName, setPresentationName] = useState('');
  const [presentationDescription, setPresentationDescription] = useState('');
  // Redux dispatch functionality
  const dispatch = useDispatch();

  // Function to navigate to a particular presentation
  const GoToParticularPresentation = (presentationId) => {
    dispatch(SetPresentationId(presentationId));
    navigate(`/presentation/${presentationId}`);
  };

  useEffect(() => {
    setPresentations(JSON.parse(localStorage.getItem('all_presentation')));
  }, []);

  // Redirect to the login page if the user is not logged in
  if (token === null) {
    console.log(token);
    return <Navigate to="/" replace />;
  } else {
    return (
      <DashboardMainBox>
        {/* User action buttons */}
        <ButtonBox>
          <HeadButton onClick={() => Open(setOpen)}>
            New presentation
          </HeadButton>
          {/* Log out and save the data */}
          <HeadButton onClick={() => Logout(navigate)}>
            Log Out
          </HeadButton>
        </ButtonBox>
        <CreateModal
          open={open}
          onClose={() => Close(setOpen)}
        >
          <ModalBox>
            <ModalInput label="Name" type="text" onChange={(e) => setPresentationName(e.target.value)}/>
            <ModalInput label="Description" type="text" onChange={(e) => setPresentationDescription(e.target.value)}/>
            <ModalButton variant="contained" color="primary" onClick={() => CreatePresentation(setPresentations, setOpen, presentationName, presentationDescription)}>Create</ModalButton>
          </ModalBox>
        </CreateModal>
        {/* Display all user presentations */}
        <PresentationBox>
          {presentations.map((presentation, index) => (
            <OnePresentationBox key={index} onClick={() => GoToParticularPresentation(presentation.id)}>
              {presentation.thumbnail === ''
                ? (
                  <ThumbnailBox>
                  </ThumbnailBox>
                  )
                : (
                  <ThumbnailBox
                    component="img"
                    src={presentation.thumbnail}
                  />
                  )
              }
              {/* Display presentation information */}
              <InformationBox>
                <PresentationText>name: {presentation.name}</PresentationText>
                <PresentationText>Number of slides: {presentation.numberOfSlides}</PresentationText>
                <PresentationText>description: {presentation.description}</PresentationText>
              </InformationBox>
            </OnePresentationBox>
          ))}
        </PresentationBox>
      </DashboardMainBox>
    );
  }
}

export default Dashboard;
