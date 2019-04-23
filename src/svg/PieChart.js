import React, {Component} from 'react';
import * as d3 from "d3";
import { sum } from 'd3-array';

const defaultStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: '.08 0 12em', //width of sidebar | ??? | width of the columns  
  alignItems: 'center',
  borderRight: '2px solid #2c3e50',
  backgroundColor: '#95a5a6',
  textAlign: 'center'
}

class PieChart extends Component {

  componentDidMount(){

    let  data = this.props.data;
    let  valueStreams = this.props.valueStreams;
    data = data.sort((a, b) => {
      return (b.openIncidents - a.openIncidents)
    })

    const w = this.props.width, 
          h = this.props.height, 
          max = data[0].openIncidents, 
          min = data[data.length - 1].openIncidents, 
          xPad = 30

    const deptColors = []; 
    const orderedDepts = [];
    const vsColors = [];
    valueStreams.forEach(vs => {
      vsColors.push(vs.backgroundColor); 
      vs.departments.forEach(d =>{
        orderedDepts.push(d.abbr)
        deptColors.push(d.backgroundColor);
        })
    })

    var colorScale = d3.scaleOrdinal()
           .domain(orderedDepts)
           .range(deptColors);
           
    // var svg = d3.select("svg")
    //               .attr("width", width)
    //               .attr("height", height);

    var svg = d3.select("#pieChart")
                    .append("g")
                    .attr("width", w)
                    .attr("height", h)
                    .style("margin-top", '2%')
                    // .style("display", 'flex')

    svg
      .append("g")
        .attr("transform", "translate(" + w / 2 + ", " + h / 2 + ")")
        .classed("chart", true);

    svg
      .append("g")
        .attr("transform", "translate(" + w / 2 + ", " + h / 2 + ")")
        .classed("inner-chart", true);
   
    svg
    .append("text")
      .classed("title", true)
      .attr("x", w / 2)
      .attr("y", 30)
      .style("font-size", "2em")
      .style("text-anchor", "middle");

    // svg.selectAll("text")
    //   .data(data)
    //   .enter()
    //   .append("text")
    //   .text((d) => `${d.department} - ${d.openIncidents}`)
    //   .attr("y", (d, i) => i * (h / data.length) + 17)
    //   .attr("x", xPad * 1.2)
    //   .attr("fill", (d, i) => d.openIncidents > 0 ? "#95a5a6" : "#2c3e50")
    //   .attr("font-size", "1.1em")
    //   .attr("font-weight", "bold")


    this.drawChart(data, h, w); 
  }

  drawChart(data, h, w){
    // var vsData = data.filter(d => d.valueStream === vs);
    var arcs = d3.pie()
                 .value(d => d.openIncidents)
                //  .sort((a, b) => orderedDepts.indexOf(a.month) - orderedDepts.indexOf(b.month));
  
    var innerArcs = d3.pie()
                      .value(d => d.openIncidents)
                      // .sort((a, b) => a.quarter - b.quarter);
  
    var path = d3.arc()
                 .innerRadius(w / 4)
                 .outerRadius(w / 2 - 40);
  
    var innerPath = d3.arc()
                      .innerRadius(0)
                      .outerRadius(w / 4);
  
    var outer = d3.select(".chart")
                  .selectAll(".arc")
                  .data(arcs(data));
  
    var inner = d3.select(".inner-chart")
                  .selectAll(".arc")
                  .data(innerArcs(getDataByQuarter(yearData)));

    outer
      .enter()
      .append("path")
        // .classed("arc", true)
        .attr("stroke", black)
        .attr("fill", d => colorScale(d.data.month))
      .merge(outer)
        .attr("d", path);

    inner
      .enter()
      .append("path")
        .classed("arc", true)
        .attr("fill", (d, i) => quarterColors[i])
      .merge(inner)
        .attr("d", innerPath);

    // d3.select(".title")
    //     .text("Births by months and quarter for " + year);
  }

      
  render(){
    return <div style={defaultStyle} id={"#" + this.props.id}></div>
  }
}

function getDataByVS(data) {
  var quarterTallies = [0, 1, 2, 3].map(n => ({ quarter: n, births: 0 }));
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var quarter = Math.floor(orderedMonths.indexOf(row.month) / 3);
    quarterTallies[quarter].births += row.births;
  }
  return quarterTallies;
}

export default PieChart;