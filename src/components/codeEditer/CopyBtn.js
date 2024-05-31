import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard/src';

const CopyBtn = ({ code: codeText }) => {
  console.log(codeText);
  return (
    <CopyToClipboard
      text={codeText}
      onCopy={() => {
        console.log('복사!');
      }}
    >
      <CopyButton type="submit">Copy</CopyButton>
    </CopyToClipboard>
  );
};

export default CopyBtn;

const CopyButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: white;
  border-radius: 10px;
`;
