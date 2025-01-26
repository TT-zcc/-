import { Modal } from '@mui/material';
import { styled } from '@mui/system';
// A container that displays modal
export const CreateModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '10000',
  fontSize: '10px'
});
