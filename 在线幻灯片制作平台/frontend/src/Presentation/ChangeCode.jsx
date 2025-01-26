// Function to change the properties of a code content item on a slide
const ChangeCode = (presentationId, slideId, codeWidth, codeHeight, codeContent, codeFontsize, codePositionX, codePositionY, setCodePositionX, setCodePositionY, setSlideContent, setChangeCodeModalState, targetLayer) => {
  // Retrieve all presentations from local storage
  const allPresentations = JSON.parse(localStorage.getItem('all_presentation'));

  // Find the target presentation by its ID
  const targetPresentation = allPresentations.find(presentation => presentation.id === presentationId);

  // Find the target slide within the presentation by its slide number
  const targetSlide = targetPresentation.slides.find(slide => slide.slideNumber === slideId);

  // Retrieve the content array of the target slide
  const content = targetSlide.content;

  // Find the index of the target content item within the slide's content
  const targetContent = content.findIndex(element => element.layer === targetLayer);

  content[targetContent] = {
    type: 'code',
    width: codeWidth,
    height: codeHeight,
    content: codeContent,
    fontSize: codeFontsize,
    layer: targetLayer,
    x: codePositionX,
    y: codePositionY
  }
  // Update the X and Y position state variables
  setCodePositionX(codePositionX);
  setCodePositionY(codePositionY);

  // Close the change code modal
  setChangeCodeModalState(false);

  // Update the content of the target slide
  setSlideContent(content);

  // Update the local storage with the updated presentations data
  localStorage.setItem('all_presentation', JSON.stringify(allPresentations));
};

export default ChangeCode;
