const MoveSlide = async (presentationId, slideId, setSlideId, setSlideContent, model) => {
  // Retrieve all presentations from local storage
  const allPresentations = JSON.parse(localStorage.getItem('all_presentation'));
  // Find the target presentation based on its ID
  const targetPresentation = allPresentations.find(presentation => presentation.id === presentationId);

  // Update the slide ID based on the specified model (forward or backward)
  if (model === 'forward') {
    slideId += 1;
  } else {
    slideId -= 1;
  }

  // Find the content of the slide with the updated slide ID
  const content = targetPresentation.slides.find(slide => slide.slideNumber === slideId)?.content;

  // Check if content exists for the slide
  if (content) {
    // Set the new slide ID and slide content
    setSlideId(slideId);
    setSlideContent(content);
  }
};

export default MoveSlide;
