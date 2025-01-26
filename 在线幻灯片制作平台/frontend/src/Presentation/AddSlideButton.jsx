import Button from '@mui/material/Button';
import { styled } from '@mui/system';
// Button to add slides
const AddSlideButton = styled(Button)({
  backgroundColor: 'rgba(100, 100, 100, 0.6)',
  borderRadius: '50%',
  width: '6%',
  maxWidth: '40px',
  minHeight: '0px',
  aspectRatio: '1 / 1',
  position: 'absolute',
  minWidth: '0',
  padding: '0',
  color: 'white',
  right: '0',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '18px'
});

export default AddSlideButton;
