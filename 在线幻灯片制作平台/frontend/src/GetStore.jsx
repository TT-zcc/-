// Function to fetch user store data from the server
export const GetStore = async (token) => {
  // Send a GET request to the server endpoint to fetch user store data
  const response = await fetch('http://localhost:5005/store', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  });

  // Parse the response data as JSON
  const data = await response.json();
  // Check if the response contains an error message
  if (data.error) {
    // Display an alert with the error message if present
    alert(data.error);
  } else {
    // If no error, return the data
    return data;
  }
};
