import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
// Displays text for the current slide number
const SlideNumberText = styled(Typography)({
  fontSize: '1em',
  position: 'absolute',
  bottom: '10px',
  left: '15px',
  zIndex: '9999'
});

export default SlideNumberText;
