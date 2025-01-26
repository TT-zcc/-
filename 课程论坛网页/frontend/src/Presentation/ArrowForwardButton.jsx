import Button from '@mui/material/Button';
import { styled } from '@mui/system';
// A button to move the slide forward
const ArrowForwardButton = styled(Button)({
  borderRadius: '50%',
  width: '35px',
  aspectRatio: '1 / 1',
  minWidth: '0',
  padding: '0',
  color: 'white',
  fontSize: '20px',
  position: 'absolute',
  right: 0
});

export default ArrowForwardButton;
