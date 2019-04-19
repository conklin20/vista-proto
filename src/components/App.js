import '../styles/app.css';
import '../styles/flatly.min.css';
import React, { Component } from 'react';
import NavBar from './NavBar'
import LeftSideBar from './LeftSideBar'
import Dashboard from './Dashboard'
import Actions from './Actions'
import IncidentForm from './IncidentForm'
import ActionForm from './ActionForm'
import ModalTemplate from './ModalTemplate'
import Footer from './Footer'
import { staticData } from '../data/StaticData.js';
import Modal from './Modal'
import Drafts from './Drafts';


class App extends Component {
  constructor(props){
    super(props);
    this.state =  {
      staticData: {}, 
      showIncidentModal: false, 
      showActionModal: false, 
      incident: {}, 
      action: {}
    };
    
    this.viewAction = this.viewAction.bind(this);
  }

  viewAction(action){
    this.setState({
      action: action,
      showActionModal: true
    });
  }
  
  componentWillMount(){
    this.setState({staticData: staticData});
  }

  render() {
    const openIncidents = this.state.staticData.incidents.filter(inc => inc.status === "Submitted"); 
    const draftIncidents = this.state.staticData.incidents.filter(inc => inc.status === "Draft"); 
    const showIncidentModal = this.state.showIncidentModal;
    const showActionModal = this.state.showActionModal;
    const lookupData = this.state.staticData.lookupData;
    const daySinceLastReport = this.state.staticData.daySinceLastReport;
    const openIncidentsReport = this.state.staticData.openIncidentByDeptReport;

    const incidentModalDimensions = {
      top: '10vh',
      bottom: '15vh',
      left: '20vw',
      right: '20vw'
    }

    const actionModalDimensions = {
      top: '10vh',
      bottom: '15vh',
      left: '20vw',
      right: '20vw'
    }
    
    const templateModalDimensions = {
      top: '10vh',
      bottom: '15vh',
      left: '20vw',
      right: '20vw'
    }
   
    const overLay = {
      top: '0',
      bottom: '0',
      left: '0',
      right: '0', 
      opacity: '0.2',
      overflow: 'hidden',
      transition: 'opacity .25s ease-in-out',
      filter:"blur(8px)",
    }
    
    return (
      <div className="App" >
        <NavBar 
          onNewIncident={() => this.setState({showIncidentModal: true})} 
          />
        <div className="Main" style={showIncidentModal || showActionModal ? overLay : null}>
          <Drafts 
            drafts={draftIncidents}
          />

          {/* <Modal>
            <ModalTemplate 
              modalDimensions={templateModalDimensions}
            >
            </ModalTemplate>
          </Modal> */}

          { showIncidentModal ? 
            <Modal>
              <IncidentForm 
                name="incidentForm"
                modalDimensions={incidentModalDimensions}
                lookupData={lookupData}
                onClose={() => this.setState({showIncidentModal: false})}
                >
              </IncidentForm>
            </Modal> : 
            null }

          { showActionModal ? 
            <Modal> 
              <ActionForm 
                className="modal"
                modalDimensions={actionModalDimensions}
                lookupData={lookupData}
                action={this.state.action}
                onClose={() => this.setState({showActionModal: false})}
              />
            </Modal> : 
            null }

          <Dashboard 
            incidents={openIncidents}
            daySinceLastReport={daySinceLastReport}
            openIncidentsReport={openIncidentsReport}
            />

          <Actions 
            openIncidents={openIncidents}
            viewAction={this.viewAction}
          />
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
