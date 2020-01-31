import styled from 'styled-components';

export const Row = styled.div`
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 2em;
  background: ${({ picked }) => (picked ? 'gray' : '')};

  :hover {
    cursor: pointer;
  }
`;

export const Container = styled.div`
  height: 350px;
  overflow: auto;
`;

export const Button = styled.button`
  border: none;
  width: 565px;
  height: 45px;
  background: slateblue;
  color: #fff;
  position: relative;
  font-size: 1.2em;
  padding: 0 2em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;

  :hover {
    background: #fff;
    color: slateblue;
  }

  :before,
  :after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: slateblue;
    transition: 400ms ease all;
  }

  :after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }

  :hover:before,
  :hover:after {
    width: 100%;
    transition: 800ms ease all;
  }
`;
