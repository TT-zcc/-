import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from './rootReducer';

// Create and configure the Redux store
const store = configureStore({
  reducer: RootReducer, // Use the RootReducer as the root reducer for the store
});

export default store; // Export the configured Redux store
