const TitleSubmit = (setTitle, setNewTitle, setModalOpen, newTitle, presentationId) => {
  // Set the title state
  setTitle(newTitle);
  // Set the new title state
  setNewTitle(newTitle);
  // Close the modal
  setModalOpen(false);
  // Retrieve all presentations from local storage
  const allPresentations = JSON.parse(localStorage.getItem('all_presentation'));
  // Update the title of the target presentation
  const updatedPresentations = allPresentations.map(presentation => {
    if (presentation.id === presentationId) {
      return {
        ...presentation,
        title: newTitle
      };
    }
    return presentation;
  });
  // Save the updated presentations to local storage
  localStorage.setItem('all_presentation', JSON.stringify(updatedPresentations));
};

export default TitleSubmit;
