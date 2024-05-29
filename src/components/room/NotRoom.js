import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreateRoomModal from './CreateRoomModal';

const NotRoom = () => {
  const [modal, setModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const createRoom = () => {
    setModal(true);
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  return (
    <RoomLists>
      <RoomText>Room이 존재하지 않습니다!</RoomText>
      {isLoggedIn && <RoomCreateBtn onClick={createRoom}>+ 생성</RoomCreateBtn>}
      {modal && <CreateRoomModal setModal={setModal} />}
    </RoomLists>
  );
};

export default NotRoom;

const RoomLists = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #d9d9d9;
  width: 700px;
  height: 300px;
`;

const RoomText = styled.p`
  font-size: 24px;
`;

const RoomCreateBtn = styled.button`
  width: 107px;
  height: 43px;
  border: 5px solid #7cca61;
  margin: 30px 0 -40px 0;
`;
