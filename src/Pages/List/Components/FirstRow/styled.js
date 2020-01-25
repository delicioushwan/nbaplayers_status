import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  div:first-child {
    min-width: 180px;
  }
  background: white;
  color: black;
  font-size: 15px;
  height: 50px;
`;

export const Col = styled.div`
  & + div {
    margin-left: 10px;
  }
  min-width: 40px;
`;
