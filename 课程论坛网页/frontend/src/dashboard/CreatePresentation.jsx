import { v4 as uuidv4 } from 'uuid';
import Close from '../Close'

// Function to create a new presentation
const CreatePresentation = (setPresentations, setOpen, presentationName, presentationDescription) => {
  const newPresentation = {
    name: presentationName,
    description: presentationDescription,
    numberOfSlides: 1,
    title: '',
    thumbnail: '', // Thumbnail image of the presentation (initially empty)
    id: uuidv4(), // Generate a unique ID for the presentation
    slides: [{
      slideNumber: 1, // Slide number (initially 1)
      content: []
    }]
  };

  // Retrieving all existing presentations from local storage
  const allPresentations = JSON.parse(localStorage.getItem('all_presentation'));

  // Adding the new presentation to the list of existing presentations
  allPresentations.push(newPresentation);

  // Updating the presentations list in local storage with the new presentation included
  localStorage.setItem('all_presentation', JSON.stringify(allPresentations));

  // Updating the presentations state with the updated list of presentations
  setPresentations(allPresentations);

  // Closing the modal or dialog
  Close(setOpen);
};

export default CreatePresentation; // Exporting the CreatePresentation function
