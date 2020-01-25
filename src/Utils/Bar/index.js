import * as d3 from 'd3';

import {} from './styled';

export default function(data, graphId) {
  console.log(data, graphId);
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
  svg
    .append('g')
    .attr('transform', `translate(${margin * 2}, 0})`)
    .call(yAxis);

  svg
    .selectAll('.bar')
    .data(dataSet)
    .join('rect')
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

  svg
    .selectAll('.label')
    .data(dataSet)
    .join('text')
    .attr('text-anchor', 'middle')
    .attr('class', 'label')
    .attr('x', d => x(d.label) + x.bandwidth() / 2)
    .attr('y', d => height)
    .attr('height', 0)
    .transition()
    .duration(750)
    .delay((d, i) => i * 150)
    .text(d => d.value)
    .attr('y', d => y(d.value) + 0.1)
    .attr('dy', '-.7em');
}
