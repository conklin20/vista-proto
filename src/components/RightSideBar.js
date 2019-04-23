import React, { Component } from 'react';
import Actions from './Actions'
import Drafts from './Drafts';
import Approvals from './Approvals';

const defaultStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: '.08 0 12em', //width of sidebar (flex-grow) | flex-shrink | width of the columns  
  alignItems: 'center',
  borderLeft: '2px solid #2c3e50',
  backgroundColor: '#95a5a6',
  padding: '2vh'
}

class RightSideBar extends Component {
  render(){
    const openIncidents = this.props.openIncidents; 
    const viewAction = this.props.viewAction;
    const draftIncidents = this.props.draftIncidents; 
    const viewDraft = this.props.viewDraft; 
    
    return(
      <div style={defaultStyle}>
        <h4>Action Dashboard</h4>
        <Actions 
          openIncidents={openIncidents}
          viewAction={viewAction}
        />
        <Approvals 
          openIncidents={openIncidents}
          viewAction={viewAction}
        />
        <Drafts 
          drafts={draftIncidents}
          viewDraft={viewDraft}
        />
      </div>
    );
  }
}

export default RightSideBar;
