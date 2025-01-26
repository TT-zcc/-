// Function to convert a file to a data URL
const fileToDataUrl = (file) => {
  // Define valid image file types
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  // Check if the provided file type is valid
  const valid = validFileTypes.find(type => type === file.type);
  if (!valid) {
    // Throw an error if the file type is not supported
    throw Error('provided file is not a png, jpg, or jpeg image.');
  }

  // Create a new FileReader object
  const reader = new FileReader();
  // Create a promise to handle the asynchronous file reading process
  const dataUrlPromise = new Promise((resolve, reject) => {
    // Set up error and load event listeners for the FileReader
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  // Read the file as a data URL
  reader.readAsDataURL(file);
  // Return the promise for the data URL
  return dataUrlPromise;
}

// Export the fileToDataUrl function
export default fileToDataUrl;
