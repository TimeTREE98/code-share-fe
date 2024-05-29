import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import AdminCodeEditer from '../components/codeEditer/AdminCodeEditer';
import StudentCodeEditer from '../components/codeEditer/StudentCodeEditer';

function Main({ socket }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);
  return (
    <SocketContainer>
      {isLoggedIn ? (
        <AdminCodeEditer socket={socket} admin />
      ) : (
        <PanelGroup direction="horizontal">
          <StudentLayout>
            <Panel>
              <AdminEditer socket={socket} />
            </Panel>
            <StyledHandle />
            <Panel>
              <StudentCodeEditer />
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
const AdminEditer = styled(AdminCodeEditer)`
  width: 100%;
`;
const StyledHandle = styled(PanelResizeHandle)`
  background-color: ${({ theme }) => theme.colors.DARK_GRAY};
  width: 10px;
  height: 100%;
`;
