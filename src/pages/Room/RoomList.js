import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NotRoom from '../../components/room/NotRoom';
import { getRooms } from '../../api/GetRooms';

const RoomList = () => {
  const [rooms, setRooms] = useState(null); // 룸 리스트 업데이트
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clickRoom, setClickRoom] = useState(null); // 클릭된 룸 정보
  const [select, setSelect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

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

  const handleClickRoom = (room) => {
    console.log(room);
    setClickRoom(room);
    setSelect(true);
  };
  const handleJoinRoom = () => {
    navigate(`/room/${clickRoom.idx}`);
  };

  console.log(rooms);
  return (
    <Container>
      <Header>
        {isLoggedIn ? (
          <LoginText>로그아웃</LoginText>
        ) : (
          <LoginText
            onClick={() => {
              navigate('/login');
            }}
          >
            관리자 로그인
          </LoginText>
        )}
      </Header>
      <Content>
        <RoomListContainer>
          {rooms ? (
            <RoomTitle>
              {rooms.map((room) => (
                <RoomLists key={room.idx} onClick={() => handleClickRoom(room)}>
                  {room.name}
                </RoomLists>
              ))}
            </RoomTitle>
          ) : (
            <NotRoom />
          )}
          {select && <JoinBtn onClick={handleJoinRoom}>참여하기</JoinBtn>}
        </RoomListContainer>
      </Content>
    </Container>
  );
};

export default RoomList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  width: 100%;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

const LoginText = styled.button`
  font-size: 25px;
  margin: 20px 0 -20px 0;
  cursor: pointer;
  width: 150px;
  height: 50px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const RoomListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 20px 0;
`;

const RoomLists = styled.div`
  background-color: #d9d9d9;
  width: 700px;
  height: 60px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const RoomTitle = styled.p`
  font-size: 24px;
  cursor: pointer;
`;

const JoinBtn = styled.button`
  font-size: 24px;
  cursor: pointer;
`;
