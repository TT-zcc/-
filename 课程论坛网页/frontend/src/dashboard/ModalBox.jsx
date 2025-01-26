import { styled } from '@mui/system';
import Box from '@mui/material/Box';
// A container for holding input fields and buttons
export const ModalBox = styled(Box)({
  maxWidth: '300px',
  height: '300px',
  width: '100%',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
});
