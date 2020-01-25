import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  cursor: pointer;
  div:first-child {
    min-width: 180px;
    font-weight: 500;
  }
  background: skyblue;
  color: white;
  padding-top: 20px;

  & + div {
    border-top: 1px solid white;
  }
  :hover {
    background: gray;
  }
`;

export const Col = styled.div`
  & + div {
    margin-left: 10px;
  }
  min-width: 40px;
`;
