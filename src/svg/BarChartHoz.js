import React, {Component} from 'react';
import * as d3 from "d3";

const defaultStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: '.08 0 12em', //width of sidebar | ??? | width of the columns  
  alignItems: 'center',
  borderRight: '2px solid #2c3e50',
  backgroundColor: '#95a5a6',
  textAlign: 'center'
}

// const barStyle = {
//   fill: '#2c3e50', 
//   borderRadius: "5px"
// }

class BarChart extends Component {

  componentDidMount(){
    this.drawChart(); 
  }

  drawChart(){
    let  data = this.props.data;
    data = data.sort((a, b) => {
      return (b.openIncidents - a.openIncidents)
    })
    const w = this.props.width, 
          h = this.props.height, 
          max = d3.max(data, d => d.openIncidents), 
          min = 0, //data[data.length - 1].openIncidents, 
          xPad = 5,
          yPad = 5

    const svg = d3.select("#barChart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .style("margin-top", '2%')
                    .style("display", 'flex')

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", (d, i) => i * (h / data.length) + yPad)
      .attr("x", xPad)
      .attr("height", (h / data.length) * .8)
      .attr("width", (d, i) => ((d.openIncidents-min)/(max-min)) * (w * .95))
      .attr("fill", "#2c3e50")
      .attr("rx", 5)
      .attr("ry", 5)
      // .attr("class", barStyle)


    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => `${d.department} - ${d.openIncidents}`)
      .attr("y", (d, i) => i * (h / data.length) + 17 + yPad)
      .attr("x", xPad * 1.2)
      .attr("fill", (d, i) => d.openIncidents > 0 ? "#95a5a6" : "#2c3e50")
      .attr("font-size", "1.1em")
      .attr("font-weight", "bold")
  }
      
  render(){
    return <div style={defaultStyle} id={"#" + this.props.id}></div>
  }
}


export default BarChart;