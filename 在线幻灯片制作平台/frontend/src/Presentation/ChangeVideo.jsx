// Function to change the properties of a video content item on a slide
const ChangeVideo = (presentationId, slideId, videoWidth, videoHeight, videoURL, videoStart, videoPositionX, videoPositionY, setVideoPositionX, setVideoPositionY, setSlideContent, setChangeVideoModalState, targetLayer) => {
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

  // Convert the videoStart value to a number (0 or 1) based on 'yes' or 'no' strings
  if (videoStart === 'yes') {
    videoStart = 1;
  } else if (videoStart === 'no') {
    videoStart = 0;
  }
  content[targetContent] = {
    type: 'video',
    width: videoWidth,
    height: videoHeight,
    videoContent: videoURL,
    state: videoStart,
    layer: targetLayer,
    x: videoPositionX,
    y: videoPositionY
  }
  // Update the X and Y position state variables
  setVideoPositionX(videoPositionX);
  setVideoPositionY(videoPositionY);

  // Close the change video modal
  setChangeVideoModalState(false);

  // Update the content of the target slide
  setSlideContent(content);

  // Update the local storage with the updated presentations data
  localStorage.setItem('all_presentation', JSON.stringify(allPresentations));
};

export default ChangeVideo;
