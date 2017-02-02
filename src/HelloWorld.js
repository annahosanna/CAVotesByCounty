import React from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import styled from 'styled-components';
import "./index.css"
// import rd3 from 'react-d3-library';
import nytdata from "./../nytimes_presidential_elections_2016_results_county.csv"

const Title = styled.h1`
font-family: courier;
color: orange;
`
const Container = styled.div`
width: 80vw;
display: flex;
flex-flow: column wrap;
align-items: center;
`

function HelloWorld() {

  var svg = d3.select("svg");

  var path = d3.geoPath();

  d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
    if (error)
      throw error;

    svg.append("g")
      .attr("class", "counties")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .enter().append("path")
      .attr("d", path)


    svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
        return a !== b;
      })));
  });

  return (
    <Container>

      <Title>Hello World!</Title>
    </Container>

    );
}

export default HelloWorld;
