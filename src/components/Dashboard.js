import React, { Component } from 'react';
import IncidentList from './IncidentList'; 
// import IncidentBreakdown from '../svg/IncidentBreakdown'; 
// import PieChart from '../svg/PieChart'
import { staticData } from '../data/StaticData.js'; //temp while i work on the graph 

const dashboardStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
  alignItems: 'center',
  backgroundColor: '#fff',
}
const incidentTableStyle = {
  width: '95%',
  height: '700px', 
  overflowY: 'scroll',
  // borderBottom: '2px solid black',
}

class Dashboard extends Component {
  render(){

    const onShowIncident = this.props.onShowIncident;
    const onShowActions = this.props.onShowActions;

    return(
      <div style={dashboardStyle}>
        <h3 style={{marginTop: '20px'}}>Incident Dashboard</h3>
        <div style={incidentTableStyle}>
          <IncidentList 
            incidents={this.props.incidents}
            onShowIncident={onShowIncident}
            onShowActions={onShowActions}
          />
        </div>
        <div id="pieChart">
          {/* <PieChart 
            data={staticData.openIncidentByDeptReport}
            height={300}
            width={600}
            valueStreams={staticData.lookupData.valueStreams}
          /> */}
        </div>
      </div>
    );
  }
}

export default Dashboard;
