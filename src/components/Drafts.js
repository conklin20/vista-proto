import React, { Component } from 'react';
import moment  from 'moment'; 
import '../styles/drafts.css'

const defaultStyle = {
  textAlign: 'center',
}

class Drafts extends Component {
  constructor(props){
    super(props);
  }

  render(){
    
    const drafts = 
    this.props.drafts.length === 0 ? 
    <h6>You currently have no drafts</h6>  
    : this.props.drafts.map((draft, index) => (         
      <Draft 
        draft={draft}
        key={draft.number}
        viewDraft={this.props.viewDraft.bind(this, draft)}                 
      />
    ))

    return (
      <div style={defaultStyle}>
        <h5>My Drafts</h5>
        <ul id="drafts" className="draft-list">
          {drafts}
        </ul>
      </div>
    )
  }
}

const Draft = ({draft, index, viewDraft}) => (
  <li key={index} className="draft" onClick={viewDraft}>
    <div className="li-num">
      <div>{draft.number} - {draft.department.number}</div>
      {draft.description.length > 27 ? draft.description.substring(0, 27).concat('...') : draft.description }  
    </div>
    <div>
      <span className="view-draft"><i className="far fa-edit"></i></span>
    </div>
  </li>
)

export default Drafts;
