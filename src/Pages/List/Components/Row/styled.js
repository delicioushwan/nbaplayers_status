import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  cursor: pointer;
  background: ${({ num }) => (num % 2 ? 'lightgray' : 'darkgray')};
  color: white;
  padding: 10px 0;

  & + div {
    border-top: 1px solid white;
  }

  :hover {
    background: #5b59bc;
  }
  div:first-child {
    min-width: 180px;
    font-weight: 500;
  }
`;

export const Col = styled.div`
  width: 40px;
  overflow: hidden;

  & + div {
    margin-left: 10px;
  }
  > div {
    width: 100%;
    heigth: 100%;
    overflow: hidden;
  }
`;
