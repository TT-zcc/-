const InitializeData = async (presentationId, setTitle, setSlideNumber, setSlideContent) => {
  // Retrieve all presentations from local storage
  const allPresentations = JSON.parse(localStorage.getItem('all_presentation'));
  // Find the target presentation based on its ID
  const targetPresentation = allPresentations.find(presentation => presentation.id === presentationId);
  // Find the first slide of the target presentation
  const targetSlide = targetPresentation.slides.find(slide => slide.slideNumber === 1);
  // Set the slide number, slide content, and title based on the target presentation
  setSlideNumber(targetPresentation.numberOfSlides);
  setSlideContent(targetSlide.content);
  // Check if the title of the presentation is empty, if so, set a default title
  if (targetPresentation.title === '') {
    setTitle('Title Text');
  } else {
    setTitle(targetPresentation.title);
  }
};

export default InitializeData;
