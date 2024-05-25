import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ring2 } from 'ldrs';
import { decode, encode } from 'js-base64';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Editor from '@monaco-editor/react';
import ResultContainer from './ResultContainer';
import { postCode } from '../../api/postCode';

const StudentCodeEditer = () => {
  const [runResponse, setRunResponse] = useState({});
  const [result, setResult] = useState('');
  const [code, setCode] = useState('// 코드를 입력해주세요');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line camelcase
  const { memory, status, stderr, stdout, time } = runResponse || {};

  ring2.register();

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
    <PanelGroup direction="vertical" style={{ height: '100vh' }}>
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
          onChange={(e) => setCode(e)}
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
  );
};

const StyledHandle = styled(PanelResizeHandle)`
  background-color: ${({ theme }) => theme.colors.DARK_GRAY};
  height: 10px;
`;

export default StudentCodeEditer;
