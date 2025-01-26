import { SetStore } from '../SetStore';

// Function to handle registration form submission
const RegisterSubmit = async (e, email, password, navigate, name, confirmPassword) => {
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

  // Check if name is empty
  if (name === '') {
    alert('Name Cannot Be Empty!'); // Display an alert if name is empty
    return; // Exit the function
  }

  // Check if the password and confirmPassword match
  if (password !== confirmPassword) {
    alert("Two Passwords Don't Match!"); // Display an alert if the passwords don't match
    return; // Exit the function
  }

  const response = await fetch('http://localhost:5005/admin/auth/register', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, password, name })
  });

  const data = await response.json();

  if (data.error) {
    alert(data.error); // Display an alert if there is an error
  } else {
    // If registration is successful, save the authentication token to local storage
    localStorage.setItem('token', data.token);
    // Navigate to the dashboard page
    navigate('/dashboard', { replace: true });

    // Initialize the store data with an empty Presentation array
    const token = data.token;
    const body = {
      store: {
        Presentation: []
      }
    }
    SetStore(body, token); // Call the SetStore function to initialize the store data
  }
}

export default RegisterSubmit;
