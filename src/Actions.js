import React, { Component } from 'react';
import './Actions.css'

const defaultStyle = {
  display: 'flex',
  flexDirection: 'column', 
  flex: '.1 0 12em',
  alignItems: 'center',
  borderLeft: '2px solid black',
  backgroundColor: '#95a5a6',
  paddingTop: '5px', 
}

class Actions extends Component {
  constructor(props){
    super(props); 
  }  
  render(){
    const actions = this.props.actions.map((action, index) => (    
      // <li style={{order: '3123' }}>
      <li key={index}
          
      >
        {action.ecd} - 
        {action.actionDesc.length > 20 ? action.actionDesc.substring(0, 20).concat('...') : action.actionDesc }
      </li>
    ))

    return (
      <div style={defaultStyle}>
        <h4>My Open Actions</h4>
        <ul style={{display:'flex', flexDirection:'column'}}>
          {actions}
        </ul>
      </div>
    )
  }
}

export default Actions;
