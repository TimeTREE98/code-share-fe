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
        <RoomTitle>
          {rooms.map((room) => (
            <RoomLists key={room.idx}>{room.name}</RoomLists>
          ))}
        </RoomTitle>
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
  gap: 10px;
`;

const RoomLists = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #d9d9d9;
  width: 700px;
  height: 60px;
  border: 1px solid #ccc;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const RoomTitle = styled.p`
  font-size: 24px;
`;
