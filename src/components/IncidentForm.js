import React, { Component } from 'react';
import '../styles/incidentForm.css'

class IncidentForm extends Component {  
  // static defaultProps = {
  //   onClose() {}
  // }

  constructor(props) {
    super(props);
  }
  
  render(){
    const curDate = new Date();
    const curTime = curDate.toTimeString(); 
    

    const {onClose} = this.props; 
    
    return(
      <div role="document">
        <div>
          <div className="modal-header">
            <h3 className="modal-title">Report New Incident</h3>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-footer">
              <button type="button" className="btn btn-info">Save Draft</button>
              <button type="button" className="btn btn-primary">Submit</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={onClose}>Cancel</button>
            </div>
          </div>
          {/* Body of Incident Form */}
          <div className="modal-body">
            <form>
              {/* Reporter Info */}
              <fieldset id="ReporterInfo">
                <h4>Reporter Info</h4>
                <div className="form-group formRow">
                  <div className="col-sm-6">
                    <label htmlFor="personReporting">Person Reporting</label>
                    <input type="text" className="form-control" id="personReporting" aria-describedby="personReportingHelp" placeholder="Start typing name.."/>
                    <small id="personReportingHelp" className="form-text text-muted">Start typing your name, and then select it when you see it available in the list.</small>
                  </div>
                  <div className="col-sm-6">
                    <fieldset>
                      <label className="control-label" htmlFor="personReportingSup">Supervisor</label>
                      <input className="form-control" id="personReportingSup" type="text" placeholder="Auto-populate supervisor…" readOnly=""/>
                    </fieldset>
                  </div>
                </div>                
                <div className="form-group formRow">
                  <div className="col-sm-6">
                    <label htmlFor="reportingDate">Date Reporting</label>
                    <input type="date" className="form-control" id="reportingDate" defaultValue={curDate} aria-describedby="reportingDateHelp" />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="reportingTime">Time Reporting</label>
                    <input type="time" className="form-control" id="reportingTime" aria-describedby="reportingTimeHelp" />
                  </div>
                </div>
              </fieldset>
              <hr/>      
              {/* Incident Detail */}
              <fieldset id="EventDetails">
                <h4>Incident Details</h4>
                <div className="form-group formRow">
                  <div className="col-sm-6">
                    <label htmlFor="incidentDate">Date of Incident</label>
                    <input type="date" className="form-control" id="incidentDate" defaultValue={curDate} aria-describedby="incidentDateHelp" />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="incidentTime">Time of Incident</label>
                    <input type="time" className="form-control" id="incidentTime" aria-describedby="incidentTimeHelp" />
                  </div>
                </div>
                <div className="form-group formRow">
                  <div className="col-sm-6">
                    <label htmlFor="personInvolved">Person Involved</label>
                    <input type="text" className="form-control" id="personInvolved" aria-describedby="personInvolvedgHelp" placeholder="Start typing name.."/>
                    <small id="personInvolvedHelp" className="form-text text-muted">Start typing a name, and then select it when you see it available in the list.</small>
                  </div>
                  <div className="col-sm-6">
                    <fieldset>
                      <label className="control-label" htmlFor="personInvolvedSup">Supervisor</label>
                      <input className="form-control" id="personInvolvedSup" type="text" placeholder="Auto-populate supervisor…" readOnly=""/>
                    </fieldset>
                  </div>
                </div>                
                <div className="form-group formRow">
                  <div className="col-sm-6">
                    <label htmlFor="jobPosition">Job Position</label>
                    <select className="form-control" id="jobPosition">
                      <option>Assembler I</option>
                      <option>Assembler II</option>
                      <option>Machinist</option>
                      <option>Foreman</option>
                      <option>Supervisor</option>
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="shift">Shift</label>
                    <select className="form-control" id="shift">
                      <option>Days</option>
                      <option>Weekend Days</option>
                      <option>Nights</option>
                      <option>Weekend Nights</option>
                      <option>Swing</option>
                    </select>
                  </div>
                </div>  
                <div className="form-group formRow">
                  <div className="col-sm-12">
                    <label htmlFor="whatHappened">What Happened</label>
                    <textarea className="form-control" id="whatHappened" rows="4"></textarea>
                  </div>
                </div>
                <div className="form-group formRow">
                  <div className="col-sm-6">
                    <label htmlFor="fieldA">Field A</label>
                    <input type="text" className="form-control" id="fieldA" />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="fieldA">Field B</label>
                    <input type="text" className="form-control" id="fieldA" />
                  </div>
                </div>
                <div className="form-group formRow">
                  <div className="col-sm-12">
                    <label htmlFor="fieldA">Field C</label>
                    <input type="text" className="form-control" id="fieldA" />
                  </div>
                </div>
                <div className="form-group formRow">
                  <div className="col-sm-4">
                    <label htmlFor="fieldA">Field X</label>
                    <input type="text" className="form-control" id="fieldA" />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="fieldA">Field Y</label>
                    <input type="text" className="form-control" id="fieldA" />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="fieldA">Field Z</label>
                    <input type="text" className="form-control" id="fieldA" />
                  </div>
                </div>
              </fieldset>
              <hr/>
              {/* Section 3 */}
              <fieldset id="section3">
                <h4>Section 3...</h4>
              </fieldset>
              <hr/>     
              {/* Section 4 */}
              <fieldset id="section4">
                <h4>Section 4...</h4>
              </fieldset>
              <hr/>      
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-info">Save Draft</button>
            <button type="button" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
      
    )
  }
}

//stateless functional component
const GeneralInformation = ({empList}) => {
  let empListLI = empList.map(emp => {
    return <ul>{ emp }</ul>
  })
  return (
    <div>
      <h3>Section 1 - General Information</h3>
      <ul>
        {empListLI}
      </ul>
    </div>
  );
}


export default IncidentForm; 