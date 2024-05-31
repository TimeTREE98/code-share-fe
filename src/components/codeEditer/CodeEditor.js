import { useEffect, useState } from 'react';
import { decode, encode } from 'js-base64';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { CopyToClipboard } from 'react-copy-to-clipboard/src';
import ResultContainer from './ResultContainer';
import { postCode } from '../../api/postCode';

function CodeEditor({ code, handleEditorChange, readOnly, showCopyBtn }) {
  const [runResponse, setRunResponse] = useState({});
  const [result, setResult] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line camelcase
  const { memory, status, stderr, stdout, time } = runResponse || {};

  const runCode = async () => {
    setIsLoading(true);
    const response = await postCode(encode(code));
    setIsLoading(false);
    setRunResponse(response);
  };

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

  return (
    // <div style={{ position: 'relative' }}>
    <PanelGroup autoSaveId="example" direction="vertical" style={{ position: 'relative', height: '100vh' }}>
      <Panel>
        <Editor
          value={code}
          height="100%"
          language="javascript"
          theme="vs-dark"
          options={{
            inlineSuggest: true,
            fontSize: '16px',
            formatOnType: true,
            autoClosingBrackets: true,
            minimap: { scale: 10 },
            readOnly,
          }}
          onChange={handleEditorChange}
        />
      </Panel>
      <StyledHandle />
      <Panel>
        <ResultContainer
          code={code}
          runCode={runCode}
          isLoading={isLoading}
          isError={isError}
          result={result}
          memory={memory}
          time={time}
          status={status}
        />
      </Panel>
      {showCopyBtn && (
        <CopyToClipboard
          text={code}
          onCopy={() => {
            alert('코드 복사!');
          }}
        >
          <CopyButton type="submit">Copy</CopyButton>
        </CopyToClipboard>
      )}
    </PanelGroup>
  );
}

export default CodeEditor;

const StyledHandle = styled(PanelResizeHandle)`
  background-color: ${({ theme }) => theme.colors.DARK_GRAY};
  height: 10px;
`;

const CopyButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
  background-color: white;
  color: black;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
`;
