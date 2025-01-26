import { GetStore } from '../GetStore';

// Function to initialize data from the server
const InitializeData = async () => {
  // Retrieve store data from the server using the token stored in local storage
  const data = await GetStore(localStorage.getItem('token'));

  // Update the local storage with the retrieved presentation data
  localStorage.setItem('all_presentation', JSON.stringify(data.store.store.Presentation));
};

export default InitializeData;
