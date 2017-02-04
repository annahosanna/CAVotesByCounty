import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import styled from 'styled-components';
import { mergeData } from "src/merge-datasets"
import { state } from "data/json"
import { Row, Column } from "src/flex"
import numeral from "numeral"
import "./index.css"

const Stats = styled(Column)`
font-family: sans-serif;
color: black;
border-radius: 2px;
padding: 2em;
z-index: 2;
position: relative;
right: -6em;
width: 250px;
height: 150px;
`
const Header = styled(Column)`
font-family: sans-serif;
position: relative;
right: -6em;
margin: 10px;
`
const Container = styled(Column)`
width: 90vw;
height: 100vh;
`
const H3 = styled.h3`
margin:0;
`
const Number = styled.div`
font-size: 2.5rem;
color: ${props => props.color}
`
export default class CA extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: "",
      clinton: "",
      trump: ""
    }
  }
  render() {
    let _state = mergeData()
    let scale = 3000
    let t1 = scale * 2.08
    let t2 = scale * .73

    var projection = d3.geoMercator().scale(scale)
    var path = d3.geoPath().projection(projection);

    let features = _state.objects.counties.geometries.map(g => topojson.feature(state, g))
    let getColor = (clinton, trump) => {
      if (clinton > trump) {
        return "blue"
      }
      return "red"
    }
    let paths = features.map(feature => {
      let color = getColor(feature.properties.clinton, feature.properties.trump)

      return <path key={Math.random()}
        fill={this.state.selected === feature.properties.name ? "black" : color}
        stroke="white"
        strokeWidth=".5px"
        transform={`translate(${t1} ${t2})`}
        d={path(feature)}
        onMouseOver={() => {
          this.setState({
            selected: feature.properties.name,
            clinton: feature.properties.clinton,
            trump: feature.properties.trump
          })
        }}>
        </path>

    })

    return <Container>
              <Row>
                <Column>
                  <Header>
                    <h1>2016 Presidential Election</h1>
                    <H3>votes per county</H3>
                  </Header>
                  <Stats>
                     <h1>{this.state.selected}</h1>
                     <Number color="blue">{`${numeral(this.state.clinton).format('0,0')}`}</Number>
                     <Number color="red">{`${numeral(this.state.trump).format('0,0')}`}</Number>
                 </Stats>
               </Column>
                  <svg  height="90vh" width="50vw"  className="container">
                   {paths}
                  </svg>
                </Row>
           </Container>
  }
}
