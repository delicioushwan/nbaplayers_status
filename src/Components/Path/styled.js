import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ height }) => css`
    width: 100%;
    height: ${height - 100}px;
  `}
`;
