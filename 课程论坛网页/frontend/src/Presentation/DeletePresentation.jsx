// Function to delete a presentation
const DeletePresentation = (presentationId, navigate) => {
  // Retrieve all presentations from local storage
  const allPresentations = JSON.parse(localStorage.getItem('all_presentation'));

  // Filter out the target presentation by its ID
  const updatedPresentations = allPresentations.filter(presentation => presentation.id !== presentationId);

  // Update local storage with the filtered presentations data
  localStorage.setItem('all_presentation', JSON.stringify(updatedPresentations));

  // Navigate to the dashboard page after deletion
  navigate('/dashboard');
};

export default DeletePresentation;
