import styled from 'styled-components';
export const BasicBtn = styled.button`
  background: slateblue;
  color: #fff;
  border: none;
  position: relative;
  font-size: 1.2em;
  padding: 0 2em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  margin-right: 10px;

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
export const Container = styled.div`
  max-width: 1500px;
  margin: auto;
`;
export const ProfileContainer = styled.div`
  display: flex;
  width: 100%;

  > div:first-child {
    min-width: 600px;
  }

  > div {
    width: 100%;
  }
`;

export const GraphContainer = styled.div`
  display: flex;
  min-width: 600px;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 50px;
`;

export const ToggleGraphBtn = styled(BasicBtn)``;

export const ComparisonBtn = styled(BasicBtn)``;

export const TypeSelector = styled.select``;
