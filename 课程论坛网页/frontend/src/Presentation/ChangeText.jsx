// Function to change the properties of a text content item on a slide
const ChangeText = (presentationId, slideId, textWidth, textHeight, text, fontSize, color, textPositionX, textPositionY, setTextPositionX, setTextPositionY, setSlideContent, setChangeTextModalCondition, targetLayer, setTextScrollTop) => {
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
    type: 'text',
    width: textWidth,
    height: textHeight,
    textContent: text,
    textFontSize: fontSize,
    textColor: color,
    layer: targetLayer,
    x: textPositionX,
    y: textPositionY
  }

  // Update the X and Y position state variables
  setTextPositionX(textPositionX);
  setTextPositionY(textPositionY);

  // Close the change text modal
  setChangeTextModalCondition(false);

  // Update the content of the target slide
  setSlideContent(content);
  setTextScrollTop(prev => prev === 0 ? 1 : 0);
  // Update the local storage with the updated presentations data
  localStorage.setItem('all_presentation', JSON.stringify(allPresentations));
};

export default ChangeText;
