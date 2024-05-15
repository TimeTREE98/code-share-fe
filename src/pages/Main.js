import styled from 'styled-components';
import CodeEditer from '../components/codeEditer/CodeEditer';

function Main({ socket }) {
  return (
    <SocketContainer>
      <CodeEditer socket={socket} />
    </SocketContainer>
  );
}

export default Main;

const SocketContainer = styled.div`
  display: flex;
`;
