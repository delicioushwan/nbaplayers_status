import styled from 'styled-components';

export const Container = styled.div``;
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
export const Profile = styled.div`
  display: flex;
`;
export const Photo = styled.div`
  background-image: ${({ url }) => `url(${url})`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  min-width: 150px;
  min-height: 200px;
`;
export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
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
  height: 150px;
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
