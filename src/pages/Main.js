import styled from 'styled-components';
import AdminCodeEditer from '../components/codeEditer/AdminCodeEditer';
import StudentCodeEditer from '../components/codeEditer/StudentCodeEditer';

function Main({ socket }) {
  const isLoggedIn = false;
  return (
    <SocketContainer>
      {isLoggedIn ? (
        <AdminCodeEditer socket={socket} />
      ) : (
        <StudentLayout>
          <AdminCodeEditer socket={socket} />
          <StudentCodeEditer />
        </StudentLayout>
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
