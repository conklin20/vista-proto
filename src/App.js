import './App.css';
import './flatly.min.css';
import React, { Component } from 'react';
import NavBar from './NavBar'
import LeftSideBar from './LeftSideBar'
import Dashboard from './Dashboard'
import Actions from './Actions'
// import IncidentModal from './IncidentForm'
import Footer from './Footer'
import { staticData } from './data/StaticData.js';

class App extends Component {
  constructor(props){
    super(props); 
    this.state =  {
                    staticData: {}, 
                    showIncidentModal: true, 
                    showActionModal: false
                  }
    
      // this.handleShow = this.handleShow.bind(this);
      // this.handleHide = this.handleHide.bind(this);
    }
  
    // handleShow() {
    //   this.setState({showIncidentModal: true});
    // }
    
    // handleHide() {
    //   this.setState({showIncidentModal: false});                
    // }
  
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
    const soretedActions = openActions.sort((d1, d2) => {
      let date1 = new Date(d1.ecd);
      let date2 = new Date(d2.ecd);
      return date1 - date2;
    })
    
    const sortedDaySinceLastReport = [...this.state.staticData.daySinceLastReport];
    sortedDaySinceLastReport.sort((d1, d2) => {
      return d1.daySinceTRR - d2.daySinceTRR;
    });

    const sortedOpenIncidentsReport = [...this.state.staticData.openIncidentByDeptReport];
    sortedOpenIncidentsReport.sort((d1, d2) => {
      return d2.openIncidents - d1.openIncidents;
    });

    
    // Show a Modal on click.
    // (In a real app, don't forget to use ARIA attributes
    // for accessibility!)
    // const incidentModal = this.state.showIncidentModal ? (
    //   <IncidentModal>
    //     <div className="modal">
    //       <div>
    //         With a portal, we can render content into a different
    //         part of the DOM, as if it were any other React child.
    //       </div>
    //       This is being rendered inside the #modal-container div.
    //       <button onClick={this.handleHide}>Hide modal</button>
    //     </div>
    //   </IncidentModal>
    // ) : null;
    
    return (
      <div className="App">
        <NavBar />
        <div className="Main">
          <LeftSideBar/>
          {/* { this.state.showIncidentForm ? <NewIncident /> : null } */}
          <Dashboard 
            incidents={incidents}
            daySinceLastReport={sortedDaySinceLastReport}
            openIncidentsReport={sortedOpenIncidentsReport}
            />
          <Actions actions={soretedActions}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
