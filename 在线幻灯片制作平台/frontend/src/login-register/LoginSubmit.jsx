import { GetStore } from '../GetStore';

// Function to handle login form submission
const LoginSubmit = async (e, email, password, navigate) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Check if email is empty
  if (email === '') {
    alert('Mailbox Account Cannot Be Empty!'); // Display an alert if email is empty
    return; // Exit the function
  }

  // Check if password is empty
  if (password === '') {
    alert('Password Cannot Be Empty!'); // Display an alert if password is empty
    return; // Exit the function
  }

  const response = await fetch('http://localhost:5005/admin/auth/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  // Check if there is an error in the response data
  if (data.error) {
    alert(data.error); // Display an alert if there is an error
  } else {
    // If authentication is successful, save the authentication token to local storage
    localStorage.setItem('token', data.token);
    // Navigate to the dashboard page
    GetStore(data.token)
      .then((result) => {
        localStorage.setItem('all_presentation', JSON.stringify(result.store.store.Presentation));
        navigate('/dashboard', { replace: true });
      })
  }
}

export default LoginSubmit; // Export the LoginSubmit function
