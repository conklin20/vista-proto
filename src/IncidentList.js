import React, { Component } from 'react';

const tableStyle = {
  fontSize: '.9em',
}

class IncidentList extends Component {
  constructor(props){
    super(props); 
    this.state = {searchInput: ''}
  }
  
  render() {
    const filteredIncidents = this.state.searchInput ? 
      this.props.incidents.filter(inc => JSON.stringify(inc).toLowerCase().includes(this.state.searchInput.toLowerCase())) 
      : this.props.incidents 
    
    const incidents = filteredIncidents.map((inc, index) => (
      <Incident key={index} {...inc} />
    ));

    return (
      <div>        
        <div className="form-group">
          <input 
            style={{width: '60%', marginLeft: '20%'}} 
            type="text" className="form-control" 
            placeholder="Search for Incidents (ex. '4204' or 'Bob B' or 'TRR')" 
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
  constructor(props){
    super(props)
    
  }
  render(){
    const {number, description, type, dateOccured, valueStream, department, ee} = this.props; 
    return(
      <tr>
        <td>{number}</td>
        <td>{type}</td>
        <td>{dateOccured}</td>
        <td>{`${valueStream.abbr} - ${department.number}`}</td>
        <td>{ee}</td>
        <td>{description.length > 75 ? description.substring(0, 75).concat('...') : description }</td>
        <td>
          <button type="button" className="btn btn-outline-primary btn-sm" >View Detail</button>
        </td>
        <td>
          <button type="button" className="btn btn-outline-primary btn-sm" >Review Actions</button>
        </td>
      </tr>   
    );
  }
}

export default IncidentList; 