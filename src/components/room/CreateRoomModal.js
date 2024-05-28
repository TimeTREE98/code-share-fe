import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createRoom } from '../../api/CreateRoom';

const CreateRoomModal = (props) => {
  const { setModal, addRoom } = props;
  const [name, setName] = useState('');
  const closeModal = () => {
    setModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출시에 새로고침 방지함
    const createRoomResult = await createRoom(name);
    console.log(createRoomResult); // 여기에 name이 없음.. 여기서 name이 찍히면
    // addRoom(createRoomResult.name); // 여기서 name 콜백으로 전달해서 RoomList에서 제목 바로 띄울 수 있도록.. ^^
    console.log(createRoomResult);
    closeModal();
  };

  useEffect(() => {
    console.log(name);
  }, [name]);

  return (
    <ModalContainer>
      <ModalText>방 제목을 입력해주세요.</ModalText>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <TitleInput type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <TitleBtn type="submit">+</TitleBtn>
        </InputContainer>
      </form>
    </ModalContainer>
  );
};

export default CreateRoomModal;

const ModalContainer = styled.div`
  position: fixed;
  top: 25%;
  bottom: 0;
  width: 500px;
  height: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const ModalText = styled.p`
  font-size: 24px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
`;

const TitleInput = styled.input`
  width: 250px;
  height: 40px;
  border: 1px solid lightgray;
`;

const TitleBtn = styled.button`
  width: 40px;
  height: 40px;
  background: forestgreen;
  font-size: 20px;
  color: white;
`;
