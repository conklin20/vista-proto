import React, { Component } from 'react';
import moment  from 'moment'; 
import '../styles/drafts.css'

const defaultStyle = {
  display: 'flex',
  flexDirection: 'column', 
  flex: '.1 0 12em',
  alignItems: 'center',
  borderLeft: '2px solid black',
  backgroundColor: '#95a5a6',
  paddingTop: '20px', 
}

class Drafts extends Component {
  constructor(props){
    super(props);

    this.viewDraft = this.viewDraft.bind(this); 
  }

  viewDraft(id){
    console.log(id); 
  }

  render(){
    const drafts = 
    this.props.drafts.length === 0 ? 
    <h6>You currently have no drafts</h6>  
    : this.props.drafts.map((draft, index) => (         
      <Draft 
        draft={draft}
        key={index}
        viewDraft={this.viewDraft.bind(this, index)}        
      />
    ))

    return (
      <div style={defaultStyle}>
        <h4>My Drafts</h4>
        <ul id="drafts" className="draft-list">
          {drafts}
        </ul>
      </div>
    )
  }
}

const Draft = ({draft, index, viewDraft}) => (
  <li key={index} className="draft">
    <div>
      <div>{draft.number} - {draft.department.number}</div>
      {draft.description.length > 27 ? draft.description.substring(0, 27).concat('...') : draft.description }  
    </div>
    <div>
      <span onClick={viewDraft}><i className="far fa-eye"></i></span>
    </div>
  </li>
)

export default Drafts;
