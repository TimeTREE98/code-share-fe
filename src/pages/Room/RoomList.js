import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NotRoom from '../../components/room/NotRoom';
import { getRooms } from '../../api/GetRooms';
import CreateRoomModal from '../../components/room/CreateRoomModal';
import { useLogout } from '../../hooks/useLogout';

const RoomList = () => {
  const [rooms, setRooms] = useState([]); // 룸 리스트 업데이트
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clickRoom, setClickRoom] = useState(null); // 클릭된 룸 정보
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();

  const addRoom = () => {
    setTimeout(async () => {
      try {
        const response = await getRooms();
        setRooms(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }, 500);
  };

  const handleClickRoom = (room) => {
    setClickRoom(room);
    setSelect(true);
  };
  const handleJoinRoom = () => {
    navigate(`/room/${clickRoom.idx}`);
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  useEffect(() => {
    const fetchRoomList = async () => {
      setLoading(true);

      try {
        const response = await getRooms();
        setRooms(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomList();
  }, []);

  return (
    <Container>
      <Header>
        {isLoggedIn ? (
          <LoginText onClick={() => logout()}>로그아웃</LoginText>
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
      {loading ? (
        <p>데이터를 받아오는 중...</p>
      ) : (
        <Content>
          {rooms.length === 0 ? (
            <NotRoom />
          ) : (
            <RoomListContainer>
              {isLoggedIn && rooms.length > 0 && (
                <CreateRoomBtn
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  <CreateRoomText>+</CreateRoomText>
                </CreateRoomBtn>
              )}
              {modal && <CreateRoomModal setModal={setModal} addRoom={addRoom} />}
              <RoomTitle>
                {rooms.map((room) => (
                  <RoomLists
                    key={room.idx}
                    onClick={() => handleClickRoom(room)}
                    isSelected={clickRoom && clickRoom.idx === room.idx}
                  >
                    {room.name}
                  </RoomLists>
                ))}
              </RoomTitle>
            </RoomListContainer>
          )}
          {select && <JoinBtn onClick={handleJoinRoom}>참여하기</JoinBtn>}
        </Content>
      )}
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
  flex-direction: column;
`;

const RoomListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;
  width: 700px;
  overflow-y: scroll;
`;

const CreateRoomBtn = styled.button`
  width: 30px;
  height: 30px;
  margin-left: auto;
  border: 1px solid #ccc;
  font-size: 30px;
  display: flex;
  justify-content: center;
`;

const CreateRoomText = styled.p`
  font-size: 25px;
  font-weight: bold;
`;

const RoomLists = styled.div`
  background-color: ${({ isSelected }) => (isSelected ? '#8b8b8b' : '#d9d9d9')};
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
  margin-top: 50px;
`;
