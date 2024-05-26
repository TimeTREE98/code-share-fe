import styled from 'styled-components';
import { useEffect, useState } from 'react';

const dummyFileList = [
  { id: 0, name: '파일1' },
  { id: 1, name: '파일1' },
  { id: 2, name: '파일2' },
  { id: 3, name: '파일3' },
  { id: 4, name: '파일4' },
];

const FileList = ({ visible }) => {
  const [selectId, setSelectId] = useState(0);
  const handleSelectId = (id) => {
    setSelectId(id);
  };

  return (
    <ListContainer>
      {visible && <NewFileButton>Files +</NewFileButton>}
      <FileListContainer>
        {dummyFileList.map((file, index) => (
          <File key={file.id} id={file.id} $currentId={selectId} onClick={() => handleSelectId(file.id)}>
            {file.name}
          </File>
        ))}
      </FileListContainer>
      <LogoutButton>LogOut</LogoutButton>
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
  ${({ theme }) => theme.typographies.L_TXT};
  color: white;
  background-color: ${({ $currentId, id, theme }) => ($currentId === id ? theme.colors.DARK_GRAY : `transparent`)};
  cursor: pointer;
`;
const LogoutButton = styled.button`
  width: 200px;
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.GRAY};
`;
export default FileList;