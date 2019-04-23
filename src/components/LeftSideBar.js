import React, { Component } from 'react';
import BarChartHoz from '../svg/BarChartHoz'
import { staticData } from '../data/StaticData.js'; //temp while i work on the graph 
import '../styles/leftSideBar.css'

const defaultStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: '.08 0 12em', //width of sidebar | ??? | width of the columns  
  alignItems: 'center',
  borderRight: '2px solid #2c3e50',
  backgroundColor: '#95a5a6',
  padding: '2vh'
}

const tableStyle = {
  fontSize: '.7em',
  backgroundColor: '#d3d3d3',
  // margin: '0',
  // width: '100%'
}

const barChartStyle = {
  backgroundColor: '#d3d3d3',
  padding: '3px 3px',
  paddingBottom: '7px',
  border: '2px solid #2C3E50',
  borderRadius: '10px',
}

class LeftSideBar extends Component {
  render(){
    return(
      <div id="dashboardBottom" style={defaultStyle}>
        <h4>Report Dashboard</h4>
        <h5>Days Since Last TRR</h5> 
        <SafeDays daySinceLastReport={this.props.daySinceLastReport} />
        <hr/>
        <h5>Open Incidents</h5> 
        {/* <OpenIncidentsByDept openIncidentsReport={this.props.openIncidentsReport} />         */}
        <div id="barChart" style={barChartStyle}>
          <BarChartHoz 
            data={staticData.openIncidentByDeptReport}
            height={300}
            width={250}
          />
        </div>
      </div>
    );
  }
}


class SafeDays extends Component {
  render(){          
    const sortedDaySinceLastReport = [...this.props.daySinceLastReport];
    sortedDaySinceLastReport.sort((d1, d2) => {
      return d1.daySinceTRR - d2.daySinceTRR;
    });

    const daysSinceLastReport = sortedDaySinceLastReport.map((row, idx) => (
      // <tr key={idx} className={idx % 2 === 0 ? 'table-light' : 'table-light'}>
      <tr key={idx} >
        <td>{row.valueStream}</td>
        <td>{row.departmentNo}</td>
        <td>{row.department}</td>
        <td>{row.daySinceTRR}</td>
      </tr>  
    ));

    return(
      <div>       
        <div className="report-table">
          <table style={tableStyle} className="table table-hover">
            <thead>
              <tr>
                <th scope="col">VS</th>
                <th scope="col">Dept</th>
                <th scope="col">Dept</th>
                <th scope="col">Days</th>
              </tr>
            </thead>
            <tbody>
              {daysSinceLastReport}
            </tbody>
          </table>        
        </div>
      </div>
    )
  }
}

class OpenIncidentsByDept extends Component {
  render(){

    const sortedOpenIncidentsReport = [...this.props.openIncidentsReport];
    sortedOpenIncidentsReport.sort((d1, d2) => {
      return d2.openIncidents - d1.openIncidents;
    });

    const OpenIncidentsByDeptReport = sortedOpenIncidentsReport.map((row, idx) => (
      // <tr key={idx} className={idx % 2 === 0 ? 'table-secondary' : 'table-default'}>
      <tr key={idx} >
        <td>{row.valueStream}</td>
        <td>{row.departmentNo}</td>
        <td>{row.department}</td>
        <td>{row.openIncidents}</td>
      </tr>  
    ));

    return(
      <div>       
        <div className="report-table">
          <table style={tableStyle} className="table table-hover">
            <thead>
              <tr className="table-row">
                <th scope="col">VS</th>
                <th scope="col">Dept</th>
                <th scope="col">Dept</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              {OpenIncidentsByDeptReport}
            </tbody>
          </table>        
        </div>
      </div>
    )
  }
}

export default LeftSideBar;
