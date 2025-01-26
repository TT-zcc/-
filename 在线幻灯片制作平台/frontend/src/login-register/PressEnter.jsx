// Function to handle pressing the Enter key
const PressEnter = (e, model, email, password, navigate, submit, name, confirmPassword) => {
  // Check if the pressed key is Enter
  if (e.key === 'Enter') {
    // If the model is 'login', call the submit function with email, password, and navigate parameters
    if (model === 'login') {
      submit(e, email, password, navigate);
    } else {
      // If the model is 'register', call the submit function with email, password, navigate, name, and confirmPassword parameters
      submit(e, email, password, navigate, name, confirmPassword);
    }
  }
};

export default PressEnter; // Export the PressEnter function
