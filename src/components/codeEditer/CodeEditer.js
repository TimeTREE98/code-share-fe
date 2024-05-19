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
  const { compile_output, memory, message, status, stderr, stdout, time, token } = runResponse || {};

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

  useEffect(() => {
    console.log(result);
  }, [result]);
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
        <RunButton type="button" onClick={() => runCode()}>
          <img src={runIcon} alt="실행 아이콘" />
          Run
        </RunButton>
        <Result $isError={isError}>{result || ''}</Result>
      </ResultContainer>
    </>
  );
}

export default CodeEditer;

const ResultContainer = styled.div`
  height: calc(100% - 50vh);
  position: fixed;
  bottom: 0;
  width: 100%;
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
const Result = styled.div`
  height: calc(100% - 63px);
  min-height: 300px;
  padding: 20px;

  font-family: Consolas, 'Courier New', monospace;
  ${({ theme }) => theme.typographies.DEFAULT_TXT};
  line-height: 1.5;
  letter-spacing: normal;
  white-space: pre;

  color: ${({ theme, $isError }) => ($isError ? theme.colors.RED_2 : theme.colors.WHITE)};
  background-color: #1c1b1a;
`;
