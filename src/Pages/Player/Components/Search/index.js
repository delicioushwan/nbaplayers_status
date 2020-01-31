import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 80%;
  height: 50px;
  font-size: 20px;
  padding: 0;
  padding-left: 10px;
  line-height: 50px;
  border: none;
`;
const Button = styled.button`
  background-color: indianred;
  outline: none;
  border: none;
  height: 50px;
  width: 80px;
  cursor: pointer;
  color: white;
  font-size: 24px;
  font-weight: 600;
  padding: 0;
  line-height: 50px;
`;

export default function({ button, onClickHandler, inputHandler, buttonDisable }) {
  return (
    <div>
      <form onSubmit={onClickHandler}>
        <Input type="text" placeholder="검색어를 입력해 주세요" onChange={inputHandler} />
        <Button type="submit" disabled={buttonDisable}>
          {buttonDisable ? '로딩!' : button}
        </Button>
      </form>
    </div>
  );
}
