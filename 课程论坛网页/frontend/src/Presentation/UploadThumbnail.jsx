import fileToDataUrl from '../fileToDataUrl';

// Function to upload a thumbnail image for a presentation.
const UploadThumbnail = async (file, presentationId) => {
  // Retrieve all presentations from local storage
  const allPresentations = JSON.parse(localStorage.getItem('all_presentation'));
  // Find the target presentation
  const targetPresentation = allPresentations.find(presentation => presentation.id === presentationId);
  // Convert the image file to a data URL
  const dataUrl = await fileToDataUrl(file);
  // Set the thumbnail property of the target presentation to the data URL
  targetPresentation.thumbnail = dataUrl;
  // Update the presentations in local storage
  localStorage.setItem('all_presentation', JSON.stringify(allPresentations));
}

export default UploadThumbnail;
