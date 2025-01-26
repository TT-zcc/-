// Function to add new code content to a slide in a presentation
const AddNewCode = (presentationId, slideId, codeWidth, codeHeight, codeContent, codeFontsize, setSlideContent, setCodeModalOpen) => {
  // Retrieve all presentations from local storage
  const allPresentations = JSON.parse(localStorage.getItem('all_presentation'));

  // Find the target presentation by its ID
  const targetPresentation = allPresentations.find(presentation => presentation.id === presentationId);

  // Find the target slide within the presentation by its slide number
  const targetSlide = targetPresentation.slides.find(slide => slide.slideNumber === slideId);

  // Retrieve the existing content of the target slide
  const content = targetSlide.content;

  // Create a new item with the provided code content and properties
  const newItem = {
    type: 'code',
    width: codeWidth,
    height: codeHeight,
    content: codeContent,
    fontSize: codeFontsize,
    layer: targetSlide.content.length + 1, // Layer of the code block (set to the next layer)
    x: '0',
    y: '0'
  };

  // Create a new content array by adding the new item to the existing content
  const newContent = [...content, newItem];

  // Close the code modal
  setCodeModalOpen(false);

  // Update the content of the target slide with the new content
  targetSlide.content = newContent;

  // Update the state with the new content of the slide
  setSlideContent(newContent);

  // Update the local storage with the updated presentations data
  localStorage.setItem('all_presentation', JSON.stringify(allPresentations));
};

export default AddNewCode;
