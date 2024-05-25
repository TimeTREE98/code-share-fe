import styled from 'styled-components';
import runIcon from '../../assets/run.svg';

const ResultContainer = ({ runCode, isLoading, isError, memory, time, status, result }) => {
  return (
    <Container>
      <SubmissionsContainer>
        <RunButton type="button" onClick={() => runCode()} disabled={isLoading}>
          {isLoading ? (
            <l-ring-2 size="25" stroke="5" stroke-length="0.25" bg-opacity="0.1" speed="0.8" color="white" />
          ) : (
            <img src={runIcon} alt="실행 아이콘" />
          )}
          Run
        </RunButton>
        <Submissions>
          <Submission>memory: {memory}kb</Submission>
          <Submission>run time: {time}s</Submission>
          <Submission>status: {status?.description}</Submission>
        </Submissions>
      </SubmissionsContainer>
      <Result $isError={isError}>{result || ''}</Result>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  bottom: 0;
  font-family: Consolas, 'Courier New', monospace;
`;
const RunButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  border-radius: 8px;
  color: white;
  ${({ theme }) => theme.typographies.BUTTON_TXT}
  background-color: ${({ theme, disabled }) => (disabled ? theme.colors.GRAY : theme.colors.GREEN_2)};
`;
const SubmissionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.WHITE};
`;
const Submissions = styled.div``;
const Submission = styled.p``;
const Result = styled.div`
  height: calc(100% - 62px);
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  overflow-y: scroll;
  ${({ theme }) => theme.typographies.DEFAULT_TXT};
  color: ${({ theme, $isError }) => ($isError ? theme.colors.RED_2 : theme.colors.WHITE)};
  line-height: 1.5;
  letter-spacing: normal;
  background-color: #1c1b1a;
`;

export default ResultContainer;
