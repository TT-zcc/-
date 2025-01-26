import Button from '@mui/material/Button';
import { styled } from '@mui/system';
// A button to move the slide backwards
const ArrowBackButton = styled(Button)({
  borderRadius: '50%',
  width: '35px',
  aspectRatio: '1 / 1',
  minWidth: '0',
  padding: '0',
  color: 'white',
  fontSize: '20px',
  position: 'absolute',
  right: '42.5px'
});

export default ArrowBackButton;
