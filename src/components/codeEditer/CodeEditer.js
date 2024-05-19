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

  // eslint-disable-next-line camelcase
  const { compile_output, memory, message, status, stderr, stdout, time, token } = runResponse || [];

  useEffect(() => {
    if (Object.keys(runResponse).length === 0) {
      return;
    }
    if (runResponse?.status?.id === 3) {
      setResult(decode(runResponse?.stdout));
    } else if (runResponse?.status?.id > 3) {
      setResult(decode(runResponse?.stderr));
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
        <Result>{result ? decode(result) : ''}</Result>
      </ResultContainer>
    </>
  );
}

export default CodeEditer;

const ResultContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
const RunButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-radius: 8px;
  background-color: #7cca61;
  color: white;
  ${({ theme }) => theme.typographies.BUTTON_TXT}
`;
const Result = styled.div`
  min-height: 300px;
  padding: 20px;
  ${({ theme }) => theme.typographies.DEFAULT_TXT}
  white-space: pre;
  background-color: white;
`;
