import styled from 'styled-components';
import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import runIcon from '../../assets/run.svg';

function CodeEditer() {
  const editorRef = useRef(null);
  const [result, setResult] = useState('// 코드를 입력해주세요');

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  function showValue() {
    setResult(editorRef.current?.getValue());
  }
  return (
    <>
      <Editor
        value={result}
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
        <RunButton type="button" onClick={showValue}>
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
  background-color: white;
`;
