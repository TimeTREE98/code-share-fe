import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from './Input';
import { loginSchema } from '../../validation/schema';
import { login, me } from '../../api/LoginApi';

const LogInForm = () => {
  const [isOpen, setIsOpen] = useState({
    password: false,
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });
  const value = watch();

  const toggleEye = (event) => {
    event.preventDefault();
    setIsOpen((prev) => ({ ...prev, password: !prev.password }));
  };

  const onSubmit = async (data) => {
    const loginResult = await login(data);
    if (loginResult.status === 'Success') {
      const meCheck = await me();
      localStorage.setItem('isLoggedIn', true);
      navigate('/');
      if (meCheck.status === 'fail') {
        alert(meCheck.message);
        localStorage.setItem('isLoggedIn', false);
      }
    } else {
      alert(loginResult.message);
      localStorage.setItem('isLoggedIn', false);
    }
  };

  return (
    <StyledLogInForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="id"
        name="id"
        value={value || ''}
        setValue={setValue}
        label="아이디"
        type="text"
        placeholder="아이디를 입력해주세요."
        register={register}
        errorMsg={errors.id?.message}
      />
      <Input
        id="pw"
        name="pw"
        value={value || ''}
        setValue={setValue}
        label="비밀번호"
        type={isOpen.password ? 'text' : 'password'}
        placeholder="비밀번호를 입력해주세요."
        register={register}
        errorMsg={errors.password?.message}
        toggleEye={(event) => toggleEye(event)}
        eyeState={isOpen.password}
      />
      <SubmitBtn type="submit">로그인</SubmitBtn>
    </StyledLogInForm>
  );
};

const StyledLogInForm = styled.form`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
const SubmitBtn = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 8px;
  ${({ theme }) => theme.typographies.BUTTON_TXT}
  color: ${({ theme }) => theme.colors.WHITE};
  background-color: ${({ theme }) => theme.colors.MAIN_COLOR};
`;
export default LogInForm;
