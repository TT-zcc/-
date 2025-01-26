// Function to change the properties of an image content item on a slide
const ChangeImage = (presentationId, slideId, imageWidth, imageHeight, imageURL, imageAlt, imagePositionX, imagePositionY, setImagePositionX, setImagePositionY, setSlideContent, setChangeImageModalCondition, targetLayer) => {
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
    type: 'image',
    width: imageWidth,
    height: imageHeight,
    imageContent: imageURL,
    alt: imageAlt,
    layer: targetLayer,
    x: imagePositionX,
    y: imagePositionY
  }
  // Update the X and Y position state variables
  setImagePositionX(imagePositionX);
  setImagePositionY(imagePositionY);

  // Close the change image modal
  setChangeImageModalCondition(false);

  // Update the content of the target slide
  setSlideContent(content);

  // Update the local storage with the updated presentations data
  localStorage.setItem('all_presentation', JSON.stringify(allPresentations));
};

export default ChangeImage;
