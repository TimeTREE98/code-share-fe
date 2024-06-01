import { useEffect, useRef, useState } from 'react';
import { decode, encode } from 'js-base64';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { CopyToClipboard } from 'react-copy-to-clipboard/src';
// import { debounce } from 'lodash';
import ResultContainer from './ResultContainer';
import { postCode } from '../../api/postCode';

function CodeEditor({ code, handleEditorChange, readOnly, showCopyBtn }) {
  const [runResponse, setRunResponse] = useState({});
  const [result, setResult] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line camelcase
  const { memory, status, stderr, stdout, time } = runResponse || {};

  // const resizeHandleRef = useRef(null);

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

  // const handleResize = debounce(() => {
  //   console.log('사이즈가 변경!');
  // }, 250);
  //
  // useEffect(() => {
  //   console.log('디바운스 적용 안됨!');
  //   const resizeObserver = new ResizeObserver((entries) => {
  //     window.requestAnimationFrame(() => {
  //       if (!Array.isArray(entries) || !entries.length) {
  //         return;
  //       }
  //       handleResize();
  //     });
  //   });
  //
  //   if (resizeHandleRef.current) {
  //     resizeObserver.observe(resizeHandleRef.current);
  //   }
  //
  //   // 언마운트될 때 observer 구독 해제
  //   return () => {
  //     if (resizeHandleRef.current) {
  //       resizeObserver.unobserve(resizeHandleRef.current);
  //     }
  //   };
  // }, []);

  return (
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
      {/* <StyledHandle ref={resizeHandleRef} /> */}
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
  top: 10px;
  right: 10px;
  z-index: 1000;
  background-color: white;
  color: black;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
`;
