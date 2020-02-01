import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ height }) => css`
    width: 100%;
    height: ${height > 400 ? height - 100 : 300}px;
  `}
  .grid line {
    stroke: lightgrey;
    stroke-opacity: 0.7;
    shape-rendering: crispEdges;
  }
  .grid path {
    stroke-width: 0;
  }

  .x-hover-line {
    stroke: #6f257f;
    stroke-width: 2px;
    stroke-dasharray: 3, 3;
  }
`;
