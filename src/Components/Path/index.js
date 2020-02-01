/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import * as d3 from 'd3';

import { Container } from './styled';

export default function({ data, graphId, barChartType = 29, addData, playerName }) {
  const containerH = window.innerHeight - document.getElementById('profileContainer').offsetHeight;
  function pathGraph() {
    const dataSet = [];
    const setData = function(data, dataSet) {
      data.forEach(a => {
        let temp = {
          season: a[0],
          stat: a[barChartType],
        };
        dataSet.push(temp);
      });
    };
    setData(data, dataSet);

    const dataBody = dataSet.slice(1);
    const margin = 40;
    const width = document.getElementById(graphId).offsetWidth - margin * 2;
    const height = document.getElementById(graphId).offsetHeight - margin * 2;
    const xData = function() {
      if (addData.length === 0) {
        return dataBody;
      } else {
        let dataSet = [];
        let max = +dataBody.length;
        let data = dataBody;
        addData.forEach(ele => {
          let element = ele.data.data.slice(1);
          if (+element.length > max) {
            dataSet = [];
            max = +element.length;
            data = element;
            setData(data, dataSet);
          }
        });
        return dataSet.length === 0 ? data : dataSet;
      }
    };
    const yData = function() {
      if (addData.length === 0) {
        return dataBody;
      } else {
        let max = +d3.max(dataBody, d => d.stat);
        let data = dataBody;
        addData.forEach(ele => {
          let element = ele.data.data;
          let temp = [];
          setData(element, temp);
          let hightest = +d3.max(temp.slice(1), d => d.stat);
          if (hightest > max) {
            max = hightest;
            data = temp;
          }
        });
        return data;
      }
    };

    const svg = d3
      .select(`#${graphId}`)
      .append('svg')
      .attr('width', width + margin * 2)
      .attr('height', height + margin * 2)
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    const xScale = xData().map((x, i) =>
      d3
        .scaleLinear()
        .range([0, width])
        .domain([0, xData().length - 1])(i),
    );
    const x = d3.scaleOrdinal().range(xScale);
    const y = d3.scaleLinear().range([height, 0]);
    x.domain(xData().map(d => d.season));
    y.domain([
      0,
      d3.max(yData(), d => {
        if (d.stat === 'PF') return 5;
        if (d.stat.includes('%')) return 1;
        return Math.ceil(d.stat);
      }),
    ]);
    const xAxis = d3
      .axisBottom(x)
      .tickSize(height)
      .tickPadding(10);

    const yAxis = d3.axisLeft(y);

    const yAxisGrid = d3
      .axisLeft(y)
      .tickSize(-width)
      .tickFormat('');

    const xAxisGrid = d3
      .axisBottom(x)
      .tickSize(height)
      .tickFormat('');

    svg
      .append('g')
      .attr('class', 'grid')
      .call(yAxisGrid);

    svg
      .append('g')
      .attr('class', 'grid')
      .call(xAxisGrid);

    svg
      .append('g')
      .style('font-size', 15)
      .style('font-weight', 'bold')
      .attr('class', 'grid')
      .call(xAxis);

    svg
      .append('g')
      .style('font-size', 15)
      .attr('class', 'grid')
      .call(yAxis);

    const focus = svg
      .append('g')
      .attr('class', 'focus')
      .style('display', 'none');
    focus
      .append('line')
      .attr('class', 'x-hover-line')
      .attr('y1', 0)
      .attr('y2', height);

    const valueline = d3
      .line()
      .x(d => x(d.season))
      .y(d => y(d.stat));

    const path = svg
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', '#ffab00')
      .attr('stroke-width', '3')
      .attr('d', valueline(dataBody));

    const totalLength = path.node().getTotalLength();

    path
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2500)
      .attr('ease', 'linear')
      .attr('stroke-dashoffset', 0);

    const circle = svg
      .selectAll('.dot')
      .data(dataBody)
      .enter()
      .append('circle')
      .attr('id', d => `circle${d.season}`)
      .attr('cx', d => x(d.season))
      .attr('cy', d => y(d.stat))
      .attr('fill', 'red')
      .attr('r', 5)
      .attr('class', 'circle');

    circle.on('mouseover', (e, d) => handleMouseOver(e, d));
    circle.on('mouseout', handleMouseOut);

    svg
      .append('text')
      .attr('x', -10)
      .attr('y', -margin / 2)
      .text(dataSet[0].stat);

    // const pathTag = svg.append('g');

    // const main = pathTag.append('g').attr('transform', `translate(${width / 2 - margin} , ${-margin} )`);
    // main
    //   .append('rect')
    //   .attr('width', 10)
    //   .attr('height', 10)
    //   .attr('fill', 'red');
    // main
    //   .append('text')
    //   .text(playerName)
    //   .attr('text-anchor', 'middle')
    //   .attr('dy', margin - 10);
    svg
      .selectAll('.label')
      .data(dataBody)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.season))
      .attr('id', d => `title${d.season}`)
      .attr('y', d => y(d.stat) + 0.1)
      .attr('dy', '-.7em')
      .attr('text-anchor', 'middle')
      .style('fill', '#898989')
      .style('visibility', 'hidden')
      .text(d => d.stat);

    function handleMouseOver(e, d) {
      const valueX = dataSet[d + 1].season;
      const valueY = dataSet[d + 1].stat;
      const title = document.getElementById(`title${e.season}`);
      const circle = document.getElementById(`circle${e.season}`);
      circle.setAttribute('r', '10');
      title.style.visibility = 'visible';
      focus.attr('transform', `translate(${x(valueX)} , ${y(valueY)} )`);
      focus.select('.x-hover-line').attr('y2', height - y(valueY));
      focus.style('display', null);
    }

    function handleMouseOut(e) {
      const title = document.getElementById(`title${e.season}`);
      const circle = document.getElementById(`circle${e.season}`);
      circle.setAttribute('r', '5');
      title.style.visibility = 'hidden';
      focus.style('display', 'none');
    }

    const color = d3.scaleOrdinal(d3.schemeAccent);
    addData.forEach((ele, i) => {
      const dataAdd = [];
      setData(ele.data.data.slice(1), dataAdd);
      dataAdd.length > 1 &&
        svg
          .append('path')
          .attr('fill', 'none')
          .attr('stroke', color(i))
          .attr('stroke-width', '3')
          .attr('d', valueline(dataAdd));

      svg
        .selectAll('.dot')
        .data(dataAdd)
        .enter()
        .append('circle')
        .attr('id', d => `circle${d.season}`)
        .attr('cx', d => x(d.season))
        .attr('cy', d => y(d.stat))
        .attr('fill', d => color(i))
        .attr('r', 0)
        .transition()
        .duration(2500)
        .attr('r', 5);

      // const sub = pathTag.append('g').attr('transform', `translate(${width / 2 + margin * i} , ${-margin} )`);
      // sub
      //   .append('rect')
      //   .attr('width', 10)
      //   .attr('height', 10)
      //   .attr('fill', color(i));
      // sub
      //   .append('text')
      //   .text(ele.data.playerDetail.info[0])
      //   .attr('text-anchor', 'middle')
      //   .attr('dy', margin - 10);
    });
  }
  function pathUpdate() {
    d3.select(`#${graphId}`)
      .select('svg')
      .remove();
    pathGraph();
  }

  useEffect(() => pathGraph(), []);
  useEffect(() => pathUpdate(), [barChartType, addData]);

  return <Container id={graphId} height={containerH} />;
}
