import styled from 'styled-components';
import LogInForm from '../components/login/LogInForm';

const LogIn = () => {
  return (
    <PageContainer>
      <LogInBox>
        <Title>로그인</Title>
        <LogInForm />
      </LogInBox>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
`;
const LogInBox = styled.div`
  margin: 130px auto;
  width: 450px;
  height: 500px;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  gap: 80px;
  border-radius: 8px;
  background-color: #343434;
`;
const Title = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.WHITE};
  ${({ theme }) => theme.typographies.TITLE}
`;
export default LogIn;
