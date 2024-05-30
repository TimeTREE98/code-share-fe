import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import CodeEditer from '../components/codeEditer/CodeEditer';
import FileList from '../components/codeEditer/FileList';

function Main({ socket }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminCode, setAdminCode] = useState('// 코드를 입력해주세요');
  const [studentCode, setStudentCode] = useState('// 코드를 입력해주세요');

  const handleEditorChange = (e) => {
    setAdminCode(e);
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  return (
    <SocketContainer>
      {isLoggedIn ? (
        <>
          <FileList />
          <CodeEditer code={adminCode} handleEditorChange={handleEditorChange} />
        </>
      ) : (
        <PanelGroup direction="horizontal">
          <FileList />
          <StudentLayout>
            <Panel>
              <CodeEditer code={adminCode} readOnly />
            </Panel>
            <StyledHandle />
            <Panel>
              <CodeEditer code={studentCode} handleEditorChange={setStudentCode} />
            </Panel>
          </StudentLayout>
        </PanelGroup>
      )}
    </SocketContainer>
  );
}

export default Main;

const SocketContainer = styled.div`
  display: flex;
`;
const StudentLayout = styled.div`
  width: 100%;
  display: flex;
`;
const StyledHandle = styled(PanelResizeHandle)`
  background-color: ${({ theme }) => theme.colors.DARK_GRAY};
  width: 10px;
  height: 100%;
`;
