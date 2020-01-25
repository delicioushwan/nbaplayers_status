import styled, { css } from 'styled-components';

export const Profile = styled.div`
  display: flex;
`;
export const Photo = styled.div`
  ${({ url }) => css`
    background-image: url(${url});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    min-width: 150px;
    min-height: 200px;
  `}
`;
export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  margin-left: 10px;

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-size: 20px;
  }

  > div:first-child {
    font-size: 35px;
    font-weight: 700;
  }
`;
export const SummaryContainer = styled.div`
  margin-top: 50px;
  height: 100px;
`;

export const Row = styled.div`
  display: flex;

  > div:first-child {
    flex: 2;
    text-align: start;
  }

  > div {
    flex: 1;
    text-align: center;
    margin-top: 10px;
  }
`;
