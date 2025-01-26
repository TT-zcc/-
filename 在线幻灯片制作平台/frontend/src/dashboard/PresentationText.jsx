import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
// Style of information on the presentation
export const PresentationText = styled(Typography)({
  fontSize: '11px',
  marginBottom: '5px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
});
