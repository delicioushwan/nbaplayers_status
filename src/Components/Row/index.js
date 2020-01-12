import React from 'react';
import {
  Row, Col
} from './styled';

export default function ({value}) {
  return (
    <>
      {value.map((player, i) => i !== 0 &&(<Row key={player[1]}>
        {player.map((stat, j) => j !== 0 && <Col key={j}>{stat}</Col>)}
      </Row>))}

    </>
  );
};
