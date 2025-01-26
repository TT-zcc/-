import { Box } from '@mui/material';
import { styled } from '@mui/system';
// A container for holding thumbnails
export const ThumbnailBox = styled(Box)({
  height: '60%',
  width: '100%',
  boxSizing: 'border-box',
  borderBottom: '1px solid black',
  backgroundColor: 'grey',
  borderTopRightRadius: '5px',
  borderTopLeftRadius: '5px'
});
