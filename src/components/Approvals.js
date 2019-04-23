import React, { Component } from 'react';
import moment  from 'moment'; 
import '../styles/approvals.css'

const defaultStyle = {
  textAlign: 'center',
  margin: '0'
}

class Approvals extends Component {
  constructor(props){
    super(props);

  }

  render(){

    const pendingAppovals = [];
    this.props.openIncidents.forEach(inc => {
      inc.actions.forEach(act => {
        if(act.assignedTo.manager === 'Bob Berthiaume' && act.cd && act.approved === false){
          pendingAppovals.push({
            incidentRef: inc.number,
            action: act
          }); 
        } 
      })
    })

    const sortedApprovals = pendingAppovals.sort((d1, d2) => {
      let date1 = new Date(d1.action.cd);
      let date2 = new Date(d2.action.cd);
      return date1 - date2;
    })
    
    const approvals = 
    sortedApprovals.length === 0 ? 
    <h6>You have no pending approvals</h6> 
      : sortedApprovals.map((action, index) => (         
      <Approval key={`${action.incidentRef}-${action.action.number}`}
        action={action.action}
        incidentRef={action.incidentRef}
        viewAction={this.props.viewAction.bind(this, action)}        
      />
    ))

    return (
      <div style={defaultStyle}>
        <h5>My Approvals</h5>
        <ul id="approvals" className="approvals-list">
          {approvals}
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

const Approval = ({action, index, viewAction}) => (
  <li key={index} className="approvals"  onClick={viewAction}>
    <div>
      <div className="li-date">
        {moment().diff(action.cd, 'days') >= 14 ? 
          <i style={pastDue} className="fas fa-exclamation-circle"></i> 
          : moment().diff(action.cd, 'days') < 14 && moment().diff(action.cd, 'days') >= 7 ?
          <i style={dueThisWeek} className="fas fa-exclamation-triangle"></i>
          : null
        }
        {/* Due Date - {`${action.cd} | ${moment().diff(action.cd, 'days')}`}  */}
        Due Date - {action.cd} 
      </div>
      {action.actionDesc.length > 27 ? action.actionDesc.substring(0, 27).concat('...') : action.actionDesc }      
    </div>
    <div>
      <span className="view-approval"><i className="far fa-eye"></i></span>
    </div>
  </li>
)

export default Approvals;
