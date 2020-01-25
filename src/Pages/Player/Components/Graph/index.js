import React, { useEffect } from 'react';
import { Container } from './styled';

export default function({ graphId, graph = () => console.log('test'), data }) {
  useEffect(() => graph(data, graphId), []);
  return <Container id={graphId} />;
}
