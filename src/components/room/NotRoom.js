import React, { useState } from 'react';
import styled from 'styled-components';
import CreateRoomModal from './CreateRoomModal';

const NotRoom = () => {
  const [modal, setModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // 로그인된 사용자만 룸 생성 가능

  const createRoom = () => {
    setModal(true);
  };

  return (
    <RoomLists>
      <RoomText>Room이 존재하지 않습니다!</RoomText>
      {isLogin && <RoomCreateBtn onClick={createRoom}>+ 생성</RoomCreateBtn>}
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
