import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { Container } from './styled';

export default function({ data, graphId }) {
  console.log('123123', data, graphId);
  function pieGraph() {
    const dataSet = [];
    const num = [11, 14, 18];
    const index = data.length - 1;
    num.forEach(ele => dataSet.push({ label: data[0][ele], value: data[index][ele] }));
    const width = document.getElementById(graphId).offsetWidth;
    const height = document.getElementById(graphId).offsetHeight;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeAccent);

    const pie = d3
      .pie()
      .value(d => d.value)
      .sort(null);
    const arc = d3
      .arc()
      .innerRadius(radius - 100)
      .outerRadius(radius);

    const svg = d3
      .select(`#${graphId}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    svg
      .append('g')
      .selectAll('path')
      .data(pie(dataSet))
      .join('path')
      .attr('fill', (d, i) => color(i))
      .attr('d', arc)
      .append('title')
      .text(d => `${d.data.label}: ${d.value}`);

    svg
      .append('g')
      .append('text')
      .append('tspan')
      .attr('text-anchor', 'middle')
      .attr('y', '-0.5em')
      .attr('font-weight', 'bold')
      .text(`${data[0][8]} : ${data[index][8]}`)
      .append('tspan')
      .attr('x', 0)
      .attr('y', '0.7em')
      .text(`${data[0][29]} : ${data[index][29]}`);

    svg
      .append('g')
      .selectAll('text')
      .data(pie(dataSet))
      .join('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .call(text =>
        text
          .append('tspan')
          .attr('y', '-0.5em')
          .attr('font-weight', 'bold')
          .text(d => d.data.label),
      )
      .call(text =>
        text
          .filter(d => d.endAngle - d.startAngle > 0.25)
          .append('tspan')
          .attr('x', 0)
          .attr('y', '0.7em')
          .attr('fill-opacity', 0.7)
          .text(d => d.value),
      );
  }

  useEffect(() => pieGraph(), []);
  return <Container id={graphId} />;
}
