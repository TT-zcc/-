// Function to delete content from a slide
const DeleteContent = (presentationId, slideId, setSlideContent, item) => {
  // Retrieve all presentations from local storage
  const allPresentations = JSON.parse(localStorage.getItem('all_presentation'));

  // Find the index of the target presentation by its ID
  const targetPresentationIndex = allPresentations.findIndex(presentation => presentation.id === presentationId);

  // Retrieve the target presentation by its index
  const targetPresentation = allPresentations[targetPresentationIndex];

  // Find the index of the target slide within the presentation by its slide number
  const targetSlideIndex = targetPresentation.slides.findIndex(slide => slide.slideNumber === slideId);

  // Retrieve the target slide by its index
  const targetSlide = targetPresentation.slides[targetSlideIndex];

  // Filter out the content item to be deleted based on its layer
  targetSlide.content = targetSlide.content.filter(subContent => subContent.layer !== item.layer);

  // Adjust the layer of the remaining content items after deletion
  targetSlide.content.forEach(subContent => {
    if (subContent.layer > item.layer) {
      subContent.layer -= 1;
    }
  });

  // Update the target presentation within the allPresentations array
  allPresentations[targetPresentationIndex] = targetPresentation;

  // Update the local storage with the updated presentations data
  localStorage.setItem('all_presentation', JSON.stringify(allPresentations));

  // Update the slide content state with the modified content
  setSlideContent(targetSlide.content);
};

export default DeleteContent;
