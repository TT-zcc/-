// Function to update the store data on the server
export const SetStore = async (body, token) => {
  const response = await fetch('http://localhost:5005/store', {
    method: 'PUT', // Use PUT method for updating data
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  // Check if there is an error in the response data
  if (data.error) {
    // If there is an error, display it as an alert
    alert(data.error);
  }
};
