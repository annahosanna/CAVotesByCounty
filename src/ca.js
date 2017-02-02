import React from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import styled from 'styled-components';
import "./index.css"
// import rd3 from 'react-d3-library';
import state from "./../data/json/caCountiesTopoSimple.json"

const Title = styled.h1`
font-family: courier;
color: orange;
`
const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-flow: column wrap;
align-items: center;
justify-content: center;
`

const CA = () => {

  let scale = 3000
  let t1 = scale * 2.08
  let t2 = scale * .73

  var projection = d3.geoMercator().scale(scale)
  var path = d3.geoPath().projection(projection);

  let features = state.objects.counties.geometries.map(g => topojson.feature(state, g))

  let paths = features.map(feature => {
    return <path key={Math.random()}
      fill="none"
      stroke="black"
      strokeWidth="1px"
      transform={`translate(${t1} ${t2})`}
      d={path(feature)}/>
  })


  return <Container>
          <svg  height="90vh" width="70vw"  className="container">
           {paths}
          </svg>
        </Container>
}

export default CA;
