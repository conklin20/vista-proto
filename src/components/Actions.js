import React, { Component } from 'react';
import moment  from 'moment'; 
import '../styles/actions.css'

const defaultStyle = {
  paddingTop: '10px', 
  textAlign: 'center',
  margin: '0'
}

class Actions extends Component {
  constructor(props){
    super(props);

  }

  render(){

    const openActions = [];
    this.props.openIncidents.forEach(inc => {
      inc.actions.forEach(act => {
        if(act.assignedTo.name === 'Bob Berthiaume' && !act.cd){
          openActions.push({
            incidentRef: inc.number,
            action: act
          }); 
        } 
      })
    })

    const sortedActions = openActions.sort((d1, d2) => {
      let date1 = new Date(d1.action.ecd);
      let date2 = new Date(d2.action.ecd);
      return date1 - date2;
    })
    
    const actions = 
    sortedActions.length === 0 ? 
    <h6>You have no open actions</h6> 
      : sortedActions.map((action, index) => (         
      <Action key={action.action.number}
        action={action.action}
        incidentRef={action.incidentRef}
        viewAction={this.props.viewAction.bind(this, action)}        
      />
    ))
    
    return (
      <div style={defaultStyle}>
        <h5>My Open Actions</h5>
        <ul id="actions" className="action-list">
          {actions}
        </ul>
      </div>
    )
  }
}

const pastDue = {
  color: '#FF4136',
  paddingRight: '5px'
}

const dueThisWeek = {
  color: '#FFDC00',
  paddingRight: '5px'
}

const Action = ({action, index, viewAction}) => (
  <li key={index} className="action" onClick={viewAction}>
    <div>
      <div className="li-date">
        {moment().diff(action.ecd, 'days') >= 0 ? 
          <i style={pastDue} className="fas fa-exclamation-circle"></i> 
          : moment().diff(action.ecd, 'days') >-7 ?
          <i style={dueThisWeek} className="fas fa-exclamation-triangle"></i>
          : null
        }
        Due Date - {action.ecd} 
      </div>
      {action.actionDesc.length > 27 ? action.actionDesc.substring(0, 27).concat('...') : action.actionDesc }      
    </div>
    <div>
      <span className="view-action"><i className="far fa-eye"></i></span>
    </div>
  </li>
)

export default Actions;
