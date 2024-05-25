import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NotRoom from '../../components/room/NotRoom';
import { getRooms } from '../../api/GetRooms';

const RoomList = () => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getRooms();
        console.log(response);
        setRooms(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(rooms);
  return (
    <RoomListContainer>
      {rooms ? (
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
