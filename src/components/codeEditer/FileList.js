import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getFiles } from '../../api/getFiles';
import { useLogout } from '../../hooks/useLogout';

const FileList = ({ fileList, setFileList, socket, admin }) => {
  const [selectId, setSelectId] = useState(0);
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const params = useParams();

  const handleSelectId = (id) => {
    setSelectId(id);

    socket.emit('openFile', {
      fileIdx: id,
    });
  };

  const deleteFile = (fileId) => {
    socket.emit('editFile', {
      event: 'DELETE',
      roomIdx: params.roomId,
      data: {
        idx: fileId,
      },
    });
  };

  const makeNewFile = () => {
    const fileName = prompt('파일명을 입력하세요');
    if (fileName !== '') {
      socket.emit('editFile', {
        event: 'CREATE',
        roomIdx: params.roomId,
        data: {
          name: fileName,
        },
      });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', {
        roomIdx: params.roomId,
      });
    }

    const fetchFiles = async () => {
      const response = await getFiles(params.roomId);
      setFileList(response);
    };
    fetchFiles();
  }, [params.roomId]);

  useEffect(() => {
    if (socket) {
      socket.on('fileList', (_data) => {
        const data = JSON.parse(_data);
        setFileList(data.data);
      });
    }
  }, [socket]);

  return (
    <ListContainer>
      {admin && <NewFileButton onClick={() => makeNewFile()}>Files +</NewFileButton>}
      <FileListContainer>
        {fileList.map((file, index) => (
          <File key={file.idx} id={file.idx} $currentId={selectId} onClick={() => handleSelectId(file.idx)}>
            {file.name}
            {admin && <DeleteButton onClick={() => deleteFile(file.idx)}>X</DeleteButton>}
          </File>
        ))}
      </FileListContainer>
      {admin ? (
        <AuthButton onClick={handleLogout}>LogOut</AuthButton>
      ) : (
        <AuthButton onClick={() => navigate('/login')}>LogIn</AuthButton>
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;
const FileListContainer = styled.div`
  margin-top: 100px;
`;
const NewFileButton = styled.button`
  width: 100%;
  padding: 20px 10px;
  ${({ theme }) => theme.typographies.BUTTON_TXT};
  color: white;
  &:hover {
    background-color: ${({ theme }) => theme.colors.DARK_GRAY};
  }
  cursor: pointer;
`;
const File = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.typographies.L_TXT};
  color: white;
  background-color: ${({ $currentId, id, theme }) => ($currentId === id ? theme.colors.DARK_GRAY : `transparent`)};
  cursor: pointer;

  &:hover > button {
    visibility: visible;
  }
`;
const DeleteButton = styled.button`
  color: white;
  ${({ theme }) => theme.typographies.BUTTON_TXT};
  visibility: hidden;
`;
const AuthButton = styled.button`
  width: 200px;
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.GRAY};
`;
export default FileList;
