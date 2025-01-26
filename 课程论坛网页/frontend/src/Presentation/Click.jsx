// Function to handle click events on slide elements
const Click = (item, setClickCount, setClickType, setClickedItem, setLayer, layer) => {
  // Check if the clicked item is on the current layer
  if (item.layer === layer) {
    // Increment the click count
    setClickCount(count => count + 1);
    // Set the click type to the type of the clicked item
    setClickType(item.type);
    // Set the clicked item
    setClickedItem(item);
  } else {
    // If the clicked item is not on the current layer, update the layer and reset the click count
    setLayer(item.layer); // Set the layer to the layer of the clicked item
    setClickType(item.type); // Set the click type to the type of the clicked item
    setClickedItem(item); // Set the clicked item
    setClickCount(1); // Reset the click count to 1
  }
};

export default Click;
