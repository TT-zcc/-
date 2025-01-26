// Initial state for the presentation ID
const InitialState = {
  presentationId: '',
};

// Action creator function to set the presentation ID
const SetPresentationId = (presentationId) => ({
  type: 'presentationId', // Action type
  payload: { presentationId }, // Payload containing the new presentation ID
});

// Reducer function to handle state updates based on actions
const RootReducer = (state = InitialState, action) => {
  // Check the action type
  if (action.type === 'presentationId') {
    // If the action type is 'presentationId', update the presentation ID in the state
    return {
      ...state,
      presentationId: action.payload.presentationId // Update the presentation ID with the new value from the payload
    };
  } else {
    // If the action type is not recognized, return the current state unchanged
    return state;
  }
}

export { RootReducer, SetPresentationId, InitialState };
