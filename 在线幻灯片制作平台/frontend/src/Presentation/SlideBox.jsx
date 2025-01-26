import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const SlideBox = styled(Box)({
  minWidth: '310px',
  width: '100%',
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  overflowX: 'auto'
});

export default SlideBox;
