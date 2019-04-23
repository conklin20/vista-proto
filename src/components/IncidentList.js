import React, { Component } from 'react';

const tableStyle = {
  fontSize: '.9em',
  // width: '95%'
}

class IncidentList extends Component {
  constructor(props){
    super(props); 
    this.state = {
      searchInput: '', 
      showIncidentModalAndPop: false, 
      showActionModalAndPop: false
    }

    // this.onShowIncident = this.onShowIncident.bind(this); 
  }
  
  render() {
    const filterConditions = this.state.searchInput.toLowerCase().split(' ');

    const filteredIncidents = filterConditions[0] !== '' ? 
      this.props.incidents
          .filter(inc => 
            filterConditions.every(cond => 
              JSON.stringify(inc)
                .toLowerCase()
                .includes(cond)
            )
          )
      : this.props.incidents 
    
    const incidents = filteredIncidents.map((inc, index) => (
      // <Incident key={index} {...inc} />
      <Incident key={index} inc={inc} />
    ));
    
    return (
      <div>        
        <div className="form-group">
          <input 
            style={{width: '60%', marginLeft: '20%'}} 
            type="text" className="form-control" 
            placeholder="Search for Incidents (ex. '4304' or 'TRR' or multiple conditions such as '4304 Bob')" 
            id="searchInput"
            name="searchInput"
            onChange={(e) => this.setState({[e.target.name]: e.target.value})}
          />
        </div>
        <div>
          <table style={tableStyle} className="table table-hover">
            <thead>
              <tr>
                <th scope="col">INC #</th>
                <th scope="col">Type</th>
                <th scope="col">Date</th>
                <th scope="col">Dept</th>
                <th scope="col">EE</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {incidents}
            </tbody>
          </table>        
        </div>
      </div>
    )
  }
}

class Incident extends Component {
  static defaultProps = {
    onShowIncident() {}, 
    onShowActions() {}
  }
  
  render(){
    const {inc} = this.props; 
    return(
      <tr>
        <td>{inc.number}</td>
        <td>{inc.type}</td>
        <td>{inc.dateOccurred}</td>
        <td>{`${inc.valueStream.abbr} - ${inc.department.number}`}</td>
        <td>{inc.ee.name}</td>
        <td>{inc.description.length > 75 ? inc.description.substring(0, 75).concat('...') : inc.description }</td>
        <td>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.props.onShowIncident.bind(this, inc)} >View</button>
        </td>
        {/* <td>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.props.onShowActions.bind(this, inc.actions)} >Review</button>
        </td> */}
      </tr>   
    );
  }
}

export default IncidentList; 