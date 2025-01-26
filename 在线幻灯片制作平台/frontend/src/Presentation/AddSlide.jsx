// Function to add a new slide to a presentation
const AddSlide = (presentationId, slideId, setSlideId, setSlideContent, setSlideNumber) => {
  // Retrieve all presentations from local storage
  const allPresentations = JSON.parse(localStorage.getItem('all_presentation'));

  // Find the target presentation by its ID
  const targetPresentation = allPresentations.find(presentation => presentation.id === presentationId);

  // Find the index of the current slide in the presentation
  const currentSlideIndex = targetPresentation.slides.findIndex(slide => slide.slideNumber === slideId);

  // Calculate the new slide number for the added slide
  const newSlideNumber = slideId;

  // Insert a new slide at the position after the current slide
  targetPresentation.slides.splice(currentSlideIndex + 1, 0, {
    slideNumber: newSlideNumber,
    content: [{}]
  });

  // Update slide numbers for subsequent slides
  targetPresentation.slides.forEach((slide, index) => {
    if (index > currentSlideIndex) {
      slide.slideNumber += 1;
    }
  });

  // Increment the total number of slides in the presentation
  targetPresentation.numberOfSlides += 1;

  // Update the local storage with the updated presentations data
  localStorage.setItem('all_presentation', JSON.stringify(allPresentations));

  // Update state variables with new slide information
  setSlideId(slideId + 1); // Increment slide ID for the next slide
  setSlideContent([{}]); // Set initial content for the new slide (empty)
  setSlideNumber(targetPresentation.numberOfSlides); // Update total number of slides
};

export default AddSlide;
