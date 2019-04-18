import React, { Component } from 'react';
import IncidentList from './IncidentList'; 
// import IncidentBreakdown from '../svg/IncidentBreakdown'; 

const tableStyle = {
  fontSize: '.8em'
}

const dashboardStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
  alignItems: 'center',
  backgroundColor: '#fff'
}
const dashboardTop = {
  width: '90%',
  height: '350px', 
  overflowY: 'scroll',
  borderBottom: '2px solid black',
}
const dashboardBottom = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '90%',
  marginTop: '2%',
}

class SafeDays extends Component {
  render(){          
    const sortedDaySinceLastReport = [...this.props.daySinceLastReport];
    sortedDaySinceLastReport.sort((d1, d2) => {
      return d1.daySinceTRR - d2.daySinceTRR;
    });

    const daysSinceLastReport = sortedDaySinceLastReport.map((row, idx) => (
      <tr key={idx}>
        <td>{row.valueStream}</td>
        <td>{row.departmentNo}</td>
        <td>{row.department}</td>
        <td>{row.daySinceTRR}</td>
      </tr>  
    ));

    return(
      <div>       
        <h5>Days Since Last Recordable By Dept</h5> 
        <div>
          <table style={tableStyle} className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Value Stream</th>
                <th scope="col">Dept #</th>
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
      <tr key={idx}>
        <td>{row.valueStream}</td>
        <td>{row.departmentNo}</td>
        <td>{row.department}</td>
        <td>{row.openIncidents}</td>
      </tr>  
    ));

    return(
      <div>       
        <h5>Open Incidents By Dept</h5> 
        <div>
          <table style={tableStyle} className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Value Stream</th>
                <th scope="col">Dept #</th>
                <th scope="col">Dept</th>
                <th scope="col">Days</th>
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

class Dashboard extends Component {

  render(){
    return(
      <div style={dashboardStyle}>
        <h3 style={{marginTop: '25px'}}>Dashboard</h3>
        <div style={dashboardTop}>
          <IncidentList 
            incidents={this.props.incidents}
          />
        </div>
        <div id="dashboardBottom" style={dashboardBottom}>
          <SafeDays daySinceLastReport={this.props.daySinceLastReport} />
          {/* <IncidentBreakdown data={fakeData.data} width={fakeData.width} height={fakeData.height} /> */}
          <OpenIncidentsByDept openIncidentsReport={this.props.openIncidentsReport} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
