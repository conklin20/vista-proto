import React, { Component } from 'react';
import * as d3 from "d3";

class IncidentBreakdown extends Component {
   
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const data = this.props.data;
    const h = this.props.height, w = this.props.width
    
    // const svg = d3.select("body")
    // .append("svg")
    // .attr("width", w)
    // .attr("height", h)
    // .style("margin-left", 100);
    const svg = d3.select('dashboardBottom').append("svg")
    .attr("width", w)
    .attr("height", h);
                      
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")
  }
        
  render(){
    return <div id={`${this.props.id}`}></div>
  }
}

export default IncidentBreakdown;