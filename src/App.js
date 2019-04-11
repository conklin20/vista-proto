import './App.css';
import './flatly.min.css';
import React, { Component } from 'react';
import NavBar from './NavBar'
import LeftSideBar from './LeftSideBar'
import Dashboard from './Dashboard'
import Actions from './Actions'
import NewIncident from './NewIncident'
import Footer from './Footer'
import { staticData } from './data/StaticData.js';

class App extends Component {
  constructor(props){
    super(props); 
    this.state = {staticData: {}}
  }
  
  componentWillMount(){
    this.setState({staticData: staticData});
  }

  render() {
    const incidents = this.state.staticData.incidents; 
    const openActions = [];
    this.state.staticData.incidents.map(inc => {
      inc.actions.map(act => {
        if(act.assignedTo === 'Bob Berthiaume' && !act.cd){
          openActions.push(act); 
        } 
      })
    })
    
    const sortedDaySinceLastReport = [...this.state.staticData.daySinceLastReport];
    sortedDaySinceLastReport.sort((d1, d2) => {
      return d1.daySinceTRR - d2.daySinceTRR;
    });

    const sortedOpenIncidentsReport = [...this.state.staticData.openIncidentByDeptReport];
    sortedOpenIncidentsReport.sort((d1, d2) => {
      return d2.openIncidents - d1.openIncidents;
    });
    
    let showNewForm = true; 

    return (
      <div className="App">
        <NavBar />
        <div className="Main">
          <LeftSideBar/>
          ${ showNewForm ? <NewIncident /> : null }
          <Dashboard 
            incidents={incidents}
            daySinceLastReport={sortedDaySinceLastReport}
            openIncidentsReport={sortedOpenIncidentsReport}
            />
          <Actions actions={openActions}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
