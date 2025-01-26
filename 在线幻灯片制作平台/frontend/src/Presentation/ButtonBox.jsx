import { styled } from '@mui/system';
import Box from '@mui/material/Box';
// Button container
const ButtonBox = styled(Box)({
  width: '95%',
  maxWidth: '960px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  position: 'relative',
  '@media (max-height: 860px)': {
    maxWidth: '750px',
    maxHeight: '700px',
  }
});

export default ButtonBox;
