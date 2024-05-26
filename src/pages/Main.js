import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import AdminCodeEditer from '../components/codeEditer/AdminCodeEditer';
import StudentCodeEditer from '../components/codeEditer/StudentCodeEditer';
import RoomList from './Room/RoomList';

function Main({ socket }) {
  return (
    <SocketContainer>
      <RoomList />
      {/* {isLoggedIn ? ( */}
      {/*  <AdminCodeEditer socket={socket} /> */}
      {/* ) : ( */}
      {/*  <PanelGroup direction="horizontal"> */}
      {/*    <StudentLayout> */}
      {/*      <Panel> */}
      {/*        <AdminCodeEditer socket={socket} /> */}
      {/*      </Panel> */}
      {/*      <StyledHandle /> */}
      {/*      <Panel> */}
      {/*        <StudentCodeEditer /> */}
      {/*      </Panel> */}
      {/*    </StudentLayout> */}
      {/*  </PanelGroup> */}
      {/* )} */}
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
