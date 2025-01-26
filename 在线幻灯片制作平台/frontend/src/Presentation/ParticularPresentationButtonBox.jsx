import { styled } from '@mui/system';
import { ButtonBox } from '../dashboard/ButtonBox';
// A container for placing toolbar buttons
const ParticularPresentationButtonBox = styled(ButtonBox)({
  width: '10%',
  height: '100%',
  minWidth: '90px',
  justifyContent: 'end',
  alignItems: 'center',
  flexDirection: 'column',
});

export default ParticularPresentationButtonBox;
