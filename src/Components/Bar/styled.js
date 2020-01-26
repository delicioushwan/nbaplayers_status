import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  .bar:hover {
    fill: steelblue;
  }

  .y-hover-line {
    stroke: #6f257f;
    stroke-width: 2px;
    stroke-dasharray: 3, 3;
  }
`;
