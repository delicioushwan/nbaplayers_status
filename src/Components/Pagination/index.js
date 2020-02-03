import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Item = styled.div`
  color: black;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;

  &.active {
    background-color: #654547;
    color: white;
    border-radius: 5px;
  }

  :hover:not(.active) {
    background-color: #ddd;
    border-radius: 5px;
  }
`;

const Prev = styled(Item)``;
const Next = styled(Item)``;

export default function({ handler, currentPage, values, limit }) {
  const total = [];
  for (let i = 0; i < Math.floor(values.length / limit) + 1; i++) {
    total.push(i);
  }
  function setPaginate(e) {
    if (e > 0 && e < total.length + 1) {
      handler(e);
    }
  }

  return (
    <Container>
      <Prev onClick={setPaginate.bind(null, currentPage - 1)}>&laquo;</Prev>
      {total.map(ele => (
        <Item key={ele} className={currentPage === ele + 1 ? 'active' : ''} onClick={setPaginate.bind(null, ele + 1)}>
          {ele + 1}
        </Item>
      ))}
      <Next onClick={setPaginate.bind(null, currentPage + 1)}>&raquo;</Next>
    </Container>
  );
}
