import styled from 'styled-components';
import OPEN_EYE from '../../assets/eye_open.svg';
import CLOSE_EYE from '../../assets/eye_close.svg';

const HiddenBtn = ({ toggleEye, eyeState }) => {
  const eye = eyeState ? OPEN_EYE : CLOSE_EYE;
  return (
    <StyledBtn onClick={(event) => toggleEye(event)}>
      <BtnIcon src={eye} />
    </StyledBtn>
  );
};

const StyledBtn = styled.button`
  align-self: center;
`;
const BtnIcon = styled.img`
  width: 18px;
  height: 18px;
`;
export default HiddenBtn;
