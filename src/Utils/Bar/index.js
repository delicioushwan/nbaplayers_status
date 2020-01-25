import * as d3 from 'd3';

import {} from './styled';

export default function(data, graphId) {
  console.log(data, graphId);
  const dataSet = [];
  data[0].forEach((ele, i) => ele.includes('%') && dataSet.push({ label: data[0][i], value: data[2][i] }));

  const width = document.getElementById(graphId).offsetWidth;
  const height = document.getElementById(graphId).offsetHeight - 10;
  const color = d3.scaleOrdinal(d3.schemeAccent);

  const svg = d3
    .select(`#${graphId}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height + 10)
    .append('g')
    .attr('translate', 'transform(0, 10)');

  const x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.4);
  const y = d3.scaleLinear().range([height, 0]);

  const xAxis = d3
    .axisBottom(x)
    .tickSize([])
    .tickPadding(10);
  const yAxis = d3.axisLeft(y).tickFormat('');
}
