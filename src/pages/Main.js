import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import CodeEditer from '../components/codeEditer/CodeEditer';
import FileList from '../components/codeEditer/FileList';

function Main({ socket }) {
  const [searchParams] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [adminCode, setAdminCode] = useState('// 코드를 입력해주세요');
  const [studentCode, setStudentCode] = useState('// 코드를 입력해주세요');

  const handleEditorChange = (e) => {
    setAdminCode(e);

    if (socket) {
      socket.emit('pushCode', { fileIdx: searchParams.get('fileIdx'), code: e });
    }
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('listenCode', (_data) => {
        const data = JSON.parse(_data);
        setAdminCode(data.code);
      });
    }
  }, [socket]);

  return (
    <SocketContainer>
      {isLoggedIn ? (
        <>
          <FileList fileList={fileList} setFileList={setFileList} socket={socket} admin />
          <CodeEditer code={adminCode} handleEditorChange={handleEditorChange} />
        </>
      ) : (
        <PanelGroup direction="horizontal">
          <FileList fileList={fileList} setFileList={setFileList} socket={socket} />
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
