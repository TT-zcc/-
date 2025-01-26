import { styled } from '@mui/system';
import Box from '@mui/material/Box';
// A container for one slide
const OneSlideBox = styled(Box)(({
  backgroundColor: 'white',
  position: 'relative',
  width: '95%',
  aspectRatio: '24 / 19',
  maxWidth: '960px',
  maxHeight: '760px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '@media (max-height: 860px)': {
    maxWidth: '750px',
    maxHeight: '700px',
  }
}));

export default OneSlideBox;
