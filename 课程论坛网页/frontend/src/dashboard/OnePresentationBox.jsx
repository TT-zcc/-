import { Box } from '@mui/material';
import { styled } from '@mui/system';
// A presentation container
export const OnePresentationBox = styled(Box)({
  width: '500px',
  height: '250px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  margin: '20px',
  borderRadius: '5px',
  '@media (min-width: 960px) and (max-width: 1080px)': {
    width: '440px',
    height: '220px',
  },
  '@media (min-width: 840px) and (max-width: 960px)': {
    width: '380px',
    height: '190px',
  },
  '@media (max-width: 540px)': {
    width: '360px',
    height: '180px',
  }
});
