import '../styles/app.css';
import '../styles/flatly.min.css';
import '../styles/sideBarMenu.css';
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
import RightSideBar from './RightSideBar';

import SideBarMenu from '../components/SideBarMenu';
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  constructor(props){
    super(props);
    this.state =  {
      staticData: {}, 
      showIncidentModal: false, 
      showActionModal: false, 
      incident: {}, 
      action: {}, 
      
      sidebarOpen: true
    };
    
    this.viewAction = this.viewAction.bind(this);
    this.viewDraft = this.viewDraft.bind(this);
    this.handleSave = this.handleSave.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.onShowIncident = this.onShowIncident.bind(this); 
    this.onShowActions = this.onShowActions.bind(this);
    
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onShowIncident(incident){
    console.log(incident);
  }

  onShowActions(actions){
    console.log(actions); 
  }

  viewAction(action){
    this.setState({
      action: action,
      showActionModal: true
    });
  }

  viewDraft(incident){
    this.setState({
      incident: incident, 
      showIncidentModal: true
    })
  }

  handleSave(incident){
    // console.log(incident)
  }

  handleSubmit(incident){
    // console.log(incident)
  }
  
  componentWillMount(){
    this.setState({staticData: staticData});
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
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
    
    const sideBarstyles = {
      root: {
        position: "absolute",
        top: '80px',
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden"
      },
      sidebar: {
        zIndex: 2,
        position: "absolute",
        top: 0,
        bottom: 0,
        transition: "transform .3s ease-out",
        WebkitTransition: "-webkit-transform .3s ease-out",
        willChange: "transform",
        overflowY: "auto"
      },
      content: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        transition: "left .3s ease-out, right .3s ease-out"
      },
      overlay: {
        zIndex: 1,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        visibility: "hidden",
        transition: "opacity .3s ease-out, visibility .3s ease-out",
        backgroundColor: "rgba(0,0,0,.3)"
      },
      dragHandle: {
        zIndex: 1,
        position: "fixed",
        top: 0,
        bottom: 0
      }
    };

    return (
      <div className="App" >
        <NavBar 
          onNewIncident={() => this.setState({showIncidentModal: true, incident: {}})} 
          />
        <div className="Main" style={showIncidentModal || showActionModal ? overLay : null}>
          <SideBarMenu 
            
          />
          {/* <LeftSideBar 
            daySinceLastReport={daySinceLastReport}
            openIncidentsReport={openIncidentsReport}
          /> */}

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
                draft={this.state.incident}
                onClose={() => this.setState({showIncidentModal: false})}
                onSaveDraft={this.handleSave}
                onSubmit={this.handleSubmit}
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
            onShowIncident={this.onShowIncident}
            onShowActions={this.onShowActions}
          />

          {/* <Actions 
            openIncidents={openIncidents}
            viewAction={this.viewAction}
          /> */}

          {/* <RightSideBar 
            openIncidents={openIncidents}
            viewAction={this.viewAction}
            draftIncidents={draftIncidents}
            viewDraft={this.viewDraft}
          /> */}
{/*   
          <Sidebar 
            styles={sideBarstyles}
            sidebar={<RightSideBar 
              openIncidents={openIncidents}
              viewAction={this.viewAction}
              draftIncidents={draftIncidents}
              viewDraft={this.viewDraft}
            />}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            onSetOpen={this.onSetSidebarOpen}
            pullRight={true}
          >
            <b>Main content</b>
          </Sidebar> */}
          <Sidebar
            styles={sideBarstyles}
            sidebar={
              <RightSideBar 
                openIncidents={openIncidents}
                viewAction={this.viewAction}
                draftIncidents={draftIncidents}
                viewDraft={this.viewDraft}
              />}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            // styles={{ sidebar: { background: "white" } }}
            pullRight={true}
            // docked={true}
            >
            <div className="openSideBarDiv" onClick={() => this.onSetSidebarOpen(true)}>
              <i class="far fa-calendar-check"></i>
              View Actions, Approvals and Drafts
              <i class="fas fa-chevron-left"></i>            
            </div>
          </Sidebar>
        </div>
        {/* <Footer/> */}
      </div>
    );
  }
}

export default App;
