import { SetStore } from '../SetStore';

// Function to handle logout
const Logout = async (navigate) => {
  // Retrieve the authentication token from local storage
  const token = localStorage.getItem('token');

  // Retrieve existing presentations from local storage or initialize an empty array if none exists
  const allPresentation = JSON.parse(localStorage.getItem('all_presentation')) || [];

  // Function to update store data and navigate to the home page
  const setAndNavigate = async (allPresentation) => {
    // Prepare the body object with updated presentation data
    const body = {
      store: {
        Presentation: allPresentation
      }
    };

    // Update the store data on the server with the updated presentation data
    await SetStore(body, token);

    // Navigate to the home page
    navigate('/');
  };
  await setAndNavigate(allPresentation);
};

export default Logout; // Export the Logout function
