import { styled } from '@mui/system';
import Box from '@mui/material/Box';
// A container for all presentations
export const PresentationBox = styled(Box)({
  minWidth: '100%',
  display: 'flex',
  height: '90%',
  flexDirection: 'row',
  flexWrap: 'wrap',
  overflow: 'auto',
  '@media (max-width: 840px)': {
    justifyContent: 'center'
  }
});
