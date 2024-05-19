import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Editor from '@monaco-editor/react';
import { encode, decode } from 'js-base64';
import { postCode } from '../../api/postCode';
import runIcon from '../../assets/run.svg';

function CodeEditer({ socket }) {
  const [runResponse, setRunResponse] = useState({});
  const [result, setResult] = useState('');
  const [code, setCode] = useState('// 코드를 입력해주세요');
  const [isError, setIsError] = useState(false);
  // eslint-disable-next-line camelcase
  const { memory, status, stderr, stdout, time } = runResponse || {};

  useEffect(() => {
    if (Object.keys(runResponse).length === 0) {
      return;
    }
    if (status?.id === 3) {
      setIsError(false);
      setResult(decode(stdout || ''));
    } else if (status?.id > 3) {
      setIsError(true);
      setResult(decode(stderr || ''));
    }
  }, [runResponse]);

  const handleEditorChange = (e) => {
    if (socket) {
      socket.emit('code', e);
      setCode(e);
    }
  };

  const runCode = async () => {
    const response = await postCode(encode(code));
    await console.log(response);
    await setRunResponse(response);
  };

  useEffect(() => {
    if (socket) {
      socket.on('code', (data) => {
        setCode(data);
      });
    }
  }, [socket]);

  return (
    <>
      <Editor
        value={code}
        height="50vh"
        language="javascript"
        theme="vs-dark"
        options={{
          inlineSuggest: true,
          fontSize: '16px',
          formatOnType: true,
          autoClosingBrackets: true,
          minimap: { scale: 10 },
        }}
        onChange={(e) => handleEditorChange(e)}
      />
      <ResultContainer>
        <SubmissionsContainer>
          <RunButton type="button" onClick={() => runCode()}>
            <img src={runIcon} alt="실행 아이콘" />
            Run
          </RunButton>
          <Submissions>
            <Submission>memory: {memory}kb</Submission>
            <Submission>run time: {time}s</Submission>
            <Submission>status: {status?.description}</Submission>
          </Submissions>
        </SubmissionsContainer>
        <Result $isError={isError}>{result || ''}</Result>
      </ResultContainer>
    </>
  );
}

export default CodeEditer;

const ResultContainer = styled.div`
  width: 100%;
  height: calc(100% - 50vh);
  position: fixed;
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
  background-color: ${({ theme }) => theme.colors.GREEN_2};
`;
const SubmissionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.WHITE};
`;
const Submissions = styled.div`
  padding: 14px 20px 0 0;
`;
const Submission = styled.p``;
const Result = styled.div`
  height: calc(100% - 63px);
  min-height: 300px;
  padding: 20px;

  ${({ theme }) => theme.typographies.DEFAULT_TXT};
  line-height: 1.5;
  letter-spacing: normal;
  white-space: pre;

  color: ${({ theme, $isError }) => ($isError ? theme.colors.RED_2 : theme.colors.WHITE)};
  background-color: #1c1b1a;
`;
