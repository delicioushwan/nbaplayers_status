import React from 'react';
import {
  Row, Col
} from './styled';

export default function ({value}) {
  return (
    <Row>
      {value && value.map((ele, i) => <Col key={i}>{ele}</Col>)}
    </Row>
  );
};
