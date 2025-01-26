import styled from 'styled-components';
// The textarea when the code is created
const CodeArea = styled.textarea`
  width: 95%;
  height: 250px;
  margin-bottom: 20px;
  overflow: auto;
  font-size: 12px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-family: Arial;
  white-space: nowrap;
`;

export default CodeArea;
