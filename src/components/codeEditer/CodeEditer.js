import styled from 'styled-components';
import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import runIcon from '../../assets/run.svg';

function CodeEditer() {
  const editorRef = useRef(null);
  const [result, setResult] = useState('');

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  function runCode() {
    const code = editorRef.current?.getValue();
    const consoleMessages = [];

    // 기존 console.log 메서드 백업
    const originalConsoleLog = console.log;

    // 새로운 console.log 정의, 메시지를 배열에 추가
    console.log = function (...args) {
      consoleMessages.push(args.join(' '));
      originalConsoleLog.apply(console, args);
    };

    try {
      // eslint-disable-next-line no-eval
      eval(code);
    } catch (error) {
      consoleMessages.push(`Error: ${error.message}`);
    }

    // `console.log`를 원래 기능으로 복원
    console.log = originalConsoleLog;

    // 수집된 메시지들을 하나의 문자열로 합쳐서 state에 저장
    setResult(consoleMessages.join('\n'));
    console.log(result);
  }

  return (
    <>
      <Editor
        value="// 코드를 입력해주세요"
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
        onMount={handleEditorDidMount}
      />
      <ResultContainer>
        <RunButton type="button" onClick={runCode}>
          <img src={runIcon} alt="실행 아이콘" />
          Run
        </RunButton>
        <Result>{result}</Result>
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
