const DeleteSlide = (presentationId, slideId, slideNumber, setSlideId, setSlideNumber, setSlideContent) => {
  // Check if the current slide number is not 1, if so, it cannot be deleted
  if (slideNumber !== 1) {
    // Get all presentation data
    const allPresentations = JSON.parse(localStorage.getItem('all_presentation'));
    // Find the index of the target presentation
    const targetPresentationIndex = allPresentations.findIndex(presentation => presentation.id === presentationId);
    // Get the target presentation
    const targetPresentation = allPresentations[targetPresentationIndex];
    // Filter out the slide to be deleted from the target presentation
    const updatedSlides = targetPresentation.slides.filter(slide => slide.slideNumber !== slideId);

    // Update the slide numbers of the remaining slides
    updatedSlides.forEach(slide => {
      if (slide.slideNumber > slideId) {
        slide.slideNumber -= 1;
      }
    });

    // Update the slide content and number of the target presentation
    targetPresentation.slides = updatedSlides;
    targetPresentation.numberOfSlides -= 1;
    allPresentations[targetPresentationIndex] = targetPresentation;
    console.log(JSON.parse(localStorage.getItem('all_presentation')));
    localStorage.setItem('all_presentation', JSON.stringify(allPresentations));
    // Update slide ID and content
    if (slideId !== 1) {
      setSlideId(slideId - 1);
      const nowSlide = targetPresentation.slides.filter(slide => slide.slideNumber === slideId - 1);
      setSlideContent(nowSlide[0].content);
    } else {
      const nowSlide = targetPresentation.slides.filter(slide => slide.slideNumber === slideId);
      setSlideContent(nowSlide[0].content);
    }

    // Update slide number
    setSlideNumber(targetPresentation.numberOfSlides);
  } else {
    alert('error: Please Delete The Presentation');
  }
};

export default DeleteSlide;
