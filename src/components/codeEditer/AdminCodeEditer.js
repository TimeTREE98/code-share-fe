import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Editor from '@monaco-editor/react';
import { encode, decode } from 'js-base64';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { ring2 } from 'ldrs';
import { postCode } from '../../api/postCode';
import ResultContainer from './ResultContainer';
import FileList from './FileList';

function AdminCodeEditer({ socket, visible, ...attrProps }) {
  const [runResponse, setRunResponse] = useState({});
  const [result, setResult] = useState('');
  const [code, setCode] = useState('// 코드를 입력해주세요');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line camelcase
  const { memory, status, stderr, stdout, time } = runResponse || {};

  ring2.register();

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
    setIsLoading(true);
    const response = await postCode(encode(code));
    setIsLoading(false);
    setRunResponse(response);
  };

  useEffect(() => {
    if (socket) {
      socket.on('code', (data) => {
        setCode(data);
      });
    }
  }, [socket]);
  return (
    <Container {...attrProps}>
      <FileList visible={visible} />
      <PanelGroup autoSaveId="example" direction="vertical" style={{ height: '100vh' }}>
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
            }}
            onChange={(e) => handleEditorChange(e)}
          />
        </Panel>
        <StyledHandle />
        <Panel>
          <ResultContainer
            runCode={runCode}
            isLoading={isLoading}
            isError={isError}
            memory={memory}
            time={time}
            status={status}
            result={result}
          />
        </Panel>
      </PanelGroup>
    </Container>
  );
}

export default AdminCodeEditer;

const Container = styled.div`
  width: 100vw;
  display: flex;
`;
const StyledHandle = styled(PanelResizeHandle)`
  background-color: ${({ theme }) => theme.colors.DARK_GRAY};
  height: 10px;
`;
