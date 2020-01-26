import React, { useEffect } from 'react';
import * as d3 from 'd3';

import { Container } from './styled';

export default function({ data, graphId }) {
  console.log('bar', data, graphId);
  function barGraph() {
    const dataSet = [];
    data[0].forEach((ele, i) => ele.includes('%') && dataSet.push({ label: data[0][i], value: (data[2][i] / 100).toFixed(2) }));
    const margin = 20;
    const width = document.getElementById(graphId).offsetWidth - margin * 2;
    const height = document.getElementById(graphId).offsetHeight - margin * 3;
    const color = d3.scaleOrdinal(d3.schemeAccent);

    const svg = d3
      .select(`#${graphId}`)
      .append('svg')
      .attr('width', width + margin * 2)
      .attr('height', height + margin * 3)
      .append('g')
      .attr('transform', `translate(${margin * 2}, ${margin})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.4);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(x).tickPadding(10);
    const yAxis = d3.axisLeft(y);

    x.domain(dataSet.map(d => d.label));
    y.domain([0, 1]);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);
    svg.append('g').call(yAxis);

    svg
      .selectAll('.bar')
      .data(dataSet)
      .join('rect')
      .on('mouseover', focusMouseover)
      .on('mouseout', focusMouseout)
      .attr('class', 'bar')
      .attr('x', d => x(d.label))
      .attr('width', x.bandwidth())
      .attr('fill', (d, i) => color(i))
      .attr('y', d => height)
      .attr('height', 0)
      .transition()
      .duration(750)
      .delay((d, i) => i * 150)
      .attr('y', d => y(d.value))
      .attr('height', d => height - y(d.value));

    const focus = svg
      .append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus
      .append('line')
      .attr('class', 'y-hover-line')
      .attr('x1', 0)
      .attr('x2', width);

    focus
      .append('text')
      .attr('x', 15)
      .attr('dy', '.31em');

    function focusMouseover(e) {
      focus.style('display', null);
      focus
        .select('.y-hover-line')
        .attr('y1', y(e.value))
        .attr('y2', y(e.value));
      focus
        .select('text')
        .text(e.value)
        .attr('fill', 'gray')
        .attr('transform', `translate(${x(e.label) + x.bandwidth() / 2}, ${y(e.value)})`)
        .attr('text-anchor', 'end')
        .attr('dy', '-.7em');
    }
    function focusMouseout(e) {
      focus.style('display', 'none');
    }
  }

  useEffect(() => barGraph(), []);
  return <Container id={graphId} />;
}
