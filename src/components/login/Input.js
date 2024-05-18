import styled from 'styled-components';
import { useEffect, useState } from 'react';
import HiddenBtn from './HiddenBtn';

const AuthInput = ({ id, name, value, label, type, placeholder, register, errorMsg, toggleEye, eyeState }) => {
  const hasHiddenBtn = id === 'password';
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(errorMsg !== undefined);
  }, [errorMsg]);

  return (
    <Container>
      <StyledInput $isError={isError}>
        <Label htmlFor={id} $isError={isError}>
          {label}
        </Label>
        <InputWrapper>
          <Input
            id={id}
            name={name}
            value={value[name] || ''}
            type={type}
            placeholder={placeholder}
            {...register(name)}
          />
          {hasHiddenBtn && <HiddenBtn toggleEye={(event) => toggleEye(event)} eyeState={eyeState} />}
        </InputWrapper>
      </StyledInput>
      <HelperTxt $isError={isError}>{errorMsg && errorMsg}</HelperTxt>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
const StyledInput = styled.div`
  height: 60px;
  padding: 10px 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${({ theme, $isError }) => ($isError ? theme.colors.MAIN_COLOR : theme.colors.GRAY)};
  border-radius: 8px;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Label = styled.label`
  ${({ theme }) => theme.typographies.SMALL_TXT}
  color: ${({ theme, $isError }) => ($isError ? theme.colors.MAIN_COLOR : theme.colors.GRAY)};
`;
const Input = styled.input`
  width: 100%;
  ${({ theme }) => theme.typographies.DEFAULT_TXT}
  color: ${({ theme }) => theme.colors.WHITE};
  border: none;
  background-color: transparent;
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY};
  }
`;
const HelperTxt = styled.p`
  margin: 10px 0 0 10px;
  align-self: start;
  ${({ theme }) => theme.typographies.DEFAULT_TXT};
  line-height: 18px;
  color: ${({ theme, $isError }) => ($isError ? theme.colors.MAIN_COLOR : theme.colors.GRAY)};
`;
export default AuthInput;
