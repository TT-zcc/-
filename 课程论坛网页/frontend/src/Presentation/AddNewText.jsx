// Function to add new text content to a slide in a presentation
const AddNewText = (presentationId, slideId, textWidth, textHeight, text, fontSize, color, setSlideContent, setTextModalOpen) => {
  // Retrieve all presentations from local storage
  const allPresentations = JSON.parse(localStorage.getItem('all_presentation'));

  // Find the target presentation by its ID
  const targetPresentation = allPresentations.find(presentation => presentation.id === presentationId);

  // Find the target slide within the presentation by its slide number
  const targetSlide = targetPresentation.slides.find(slide => slide.slideNumber === slideId);

  // Retrieve the existing content of the target slide
  const content = targetSlide.content;

  const newItem = {
    type: 'text',
    width: textWidth,
    height: textHeight,
    textContent: text,
    textFontSize: fontSize,
    textColor: color,
    layer: targetSlide.content.length + 1,
    x: '0',
    y: '0'
  };
  // Create a new content array by adding the new item to the existing content
  const newContent = [...content, newItem];

  // Close the text modal
  setTextModalOpen(false);

  // Update the content of the target slide with the new content
  targetSlide.content = newContent;

  // Update the state with the new content of the slide
  setSlideContent(newContent);

  // Update the local storage with the updated presentations data
  localStorage.setItem('all_presentation', JSON.stringify(allPresentations));
};

export default AddNewText;
