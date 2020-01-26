import React, { useEffect } from 'react';

import { Container } from './styled';

export default function({ data, graphId }) {
  function pathGraph() {}

  useEffect(() => pathGraph(), []);
  return <Container id={graphId} />;
}
