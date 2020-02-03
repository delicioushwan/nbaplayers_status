import React from 'react';
import { Row, Col } from './styled';

export default function({ value, history, currentPage, limit }) {
  console.log(currentPage, Math.floor(value.length / limit));
  function onClickToPlayer(player) {
    history.push(`${player}`);
  }

  return (
    <>
      {value.map(
        (player, i) =>
          i !== 0 &&
          Math.floor(i / limit) + 1 === currentPage && (
            <Row onClick={onClickToPlayer.bind(null, player[0])} num={i} key={player[1]}>
              {player.map(
                (stat, j) =>
                  j !== 0 && (
                    <Col key={j}>
                      <div>{stat}</div>
                    </Col>
                  ),
              )}
            </Row>
          ),
      )}
    </>
  );
}
