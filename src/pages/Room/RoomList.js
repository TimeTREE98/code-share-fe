import React, { useState } from 'react';
import styled from 'styled-components';
import NotRoom from '../../components/room/NotRoom';

const RoomList = () => {
  const [isRoom, setIsRoom] = useState(false);

  console.log(isRoom);
  return (
    <RoomListContainer>
      {isRoom ? (
        <RoomLists>
          <p>1번방...</p>
          <p>2번방...</p>
        </RoomLists>
      ) : (
        <NotRoom />
      )}
    </RoomListContainer>
  );
};

export default RoomList;

const RoomListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  width: 100%;
  height: 100vh;
`;

const RoomLists = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #d9d9d9;
  width: 700px;
  height: 300px;
`;
