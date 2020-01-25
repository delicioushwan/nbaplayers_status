import styled from 'styled-components';

export const SeasonDataContainer = styled.div`
  width: 100%;
  text-align: right;
  margin: 10px 0 40px;

  > div:first-child {
    border-bottom: 1px solid black;
    padding-bottom: 10px;
    margin: 0;
  }
`;

export const SeasonDataRow = styled.div`
  display: flex;
  min-width: 1200px;
  font-weight: 700;
  margin-top: 5px;

  > div {
    flex: 1;
  }

  > div:first-child {
    flex: 2;
    text-align: left;
  }
`;
