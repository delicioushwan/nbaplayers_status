import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: flex;

  background: black;
  color: white;
  font-size: 14px;
  font-weight: 700;
  height: 50px;

  div:first-child {
    min-width: 180px;
  }
`;

export const Col = styled.div`
  & + div {
    margin-left: 10px;
  }
  min-width: 40px;
`;
