import React from 'react';
import { Row, Col } from './styled';

export default function({ value, history }) {
  function onClickToPlayer(player) {
    history.push(`${player}`);
  }

  return (
    <>
      {value.map(
        (player, i) =>
          i !== 0 && (
            <Row onClick={onClickToPlayer.bind(null, player[0])} key={player[1]}>
              {player.map((stat, j) => j !== 0 && <Col key={j}>{stat}</Col>)}
            </Row>
          ),
      )}
    </>
  );
}
