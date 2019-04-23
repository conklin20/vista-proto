import React, { Component } from 'react';
import '../styles/incidentForm.css'
import { DateTime } from 'luxon';
import { convertToShortDate } from '../helpers/dateHelpers';
import AutoComplete from './AutoComplete'
import Alert from './Alert'
import Modal from './Modal'
import '../styles/autoComplete.css';

const alertTypes = Object.freeze({
  WARNING:  'Warning',
  ERROR:    'Error',
  SUCCESS:  'Success'
});

const alertModalDimensions = {
  top: '15vh',
  bottom: '60vh',
  left: '40vw',
  right: '40vw'
}

class IncidentForm extends Component {    
  //static methods
  static defaultProps = {
    //creating a callback that will be called when the form is submitted, which will pass the incident back to the App.js where the state lives
    onSave() {}
  }

  constructor(props) {
    super(props);

    this.state = {
      supervisor: 'Auto-populate supervisor…',
      incident: {

      }, 
      showAlert: false, 
      alertType: alertTypes.WARNING, 
      alertText: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleSave = this.handleSave.bind(this); 
    // this.onChange = this.onChange.bind(this); 
  }

  handleSubmit(e){
    e.preventDefault(); 
    // invoking onSave and passing into it all the values in this.state
    // this.props.onSave({...this.state});
    this.setState({
      showAlert: true, 
      alertType: alertTypes.SUCCESS, 
      alertText: "Incident successfully submitted!"
    })
  }

  handleSave(e){
    e.preventDefault(); 
    
    this.setState({
      showAlert: true, 
      alertType: alertTypes.SUCCESS, 
      alertText: "Draft successfully saved!"
    })
  }

  // onChange(e){
  //   console.log(e); 
  // }
  
  render(){
    const today = convertToShortDate(DateTime.local());
    const draft = this.props.draft; 
    const isDraft = !(Object.entries(draft).length === 0 && draft.constructor === Object)
    const reportingDate = isDraft ? draft.dateOccurred : convertToShortDate(DateTime.local())
    const incidentDate = isDraft ? draft.dateOccurred : convertToShortDate(DateTime.local())
    const lookupData = this.props.lookupData;
    const onClose = this.props.onClose;

    const jobs = lookupData.jobs.map((job, index) => (
      <option key={index}>{job}</option>
    )); 

    // console.log(draft)

    return(      
      <div role="document">
        { this.state.showAlert ? 
          <Modal>
            <Alert 
              name="alertForm"
              modalDimensions={alertModalDimensions}
              alertType={this.state.alertType}
              alertText={this.state.alertText}
              onClose={() => this.setState({showAlert: false})}
              >
            </Alert>
          </Modal> : 
          null }

        <div>
          <div className="modal-header">
            <h3 className="modal-title">{isDraft ? `Edit Draft - #${draft.number}` : "Report New Incident"}</h3>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-footer">
              <button type="submit" className="btn btn-info" onClick={this.handleSave}>Save Draft</button>
              <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={onClose}>Cancel</button>
            </div>
          </div>
          {/* Body of Incident Form */}
          <div className="modal-body">
            <form onSubmit={this.handleSubmit}>
              {/* Reporter Info */}
              <fieldset id="ReporterInfo">
                <h4>Reporter Info</h4>
                <div className="form-group formRow">
                  <div className="col-sm-6 container">
                    <label htmlFor="personReporting">Person Reporting</label>
                    {/* <input type="text" className="form-control" id="personReporting" aria-describedby="personReportingHelp" placeholder="Start typing name.."/> */}
                    <AutoComplete 
                      placeholder={isDraft ? 'Bob Berthiaume' : 'Start typing a name...'}
                      options={lookupData.employees}
                      className="form-control input"
                    />
                    <small id="personReportingHelp" className="form-text text-muted">Start typing your name, and then select it when you see it available in the list.</small>
                  </div>
                  <div className="col-sm-6">
                    <fieldset>
                      <label className="control-label" htmlFor="personReportingSup">Supervisor</label>
                      <input className="form-control" id="personReportingSup" type="text" placeholder={isDraft ? "Bill Mackleit" : "Auto-populate supervisor…"} readOnly={true} />
                    </fieldset>
                  </div>
                </div>                
                <div className="form-group formRow">
                  <div className="col-sm-6">
                    <label htmlFor="reportingDate">Date Reporting</label>
                    <input type="date" className="form-control" id="reportingDate" defaultValue={isDraft ? reportingDate : today} aria-describedby="reportingDateHelp" />
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
                    <input type="date" className="form-control" id="incidentDate" defaultValue={isDraft ? reportingDate : today} aria-describedby="incidentDateHelp" />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="incidentTime">Time of Incident</label>
                    <input type="time" className="form-control" id="incidentTime" aria-describedby="incidentTimeHelp" />
                  </div>
                </div>
                <div className="form-group formRow">
                  <div className="col-sm-6">
                    <label htmlFor="personInvolved">Person Involved</label>
                    {/* <input type="text" className="form-control" id="personInvolved" aria-describedby="personInvolvedgHelp" placeholder="Start typing name.."/> */}                    
                    <AutoComplete 
                      placeholder={isDraft ? draft.ee.name : 'Start typing a name...'}
                      options={lookupData.employees}
                      className="form-control input"
                    />
                    <small id="personInvolvedHelp" className="form-text text-muted">Start typing a name, and then select it when you see it available in the list.</small>
                  </div>
                  <div className="col-sm-6">
                    <fieldset>
                      <label className="control-label" htmlFor="personInvolvedSup">Supervisor</label>
                      <input className="form-control" id="personInvolvedSup" type="text" placeholder={isDraft ? draft.ee.manager : "Auto-populate supervisor…"} readOnly={true} />
                    </fieldset>
                  </div>
                </div>                
                <div className="form-group formRow">
                  <div className="col-sm-6">
                    <label htmlFor="jobPosition">Job Position</label>
                    <select className="form-control" id="jobPosition">
                      {jobs}
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
                    <textarea className="form-control" id="whatHappened" rows="4" defaultValue={isDraft ? draft.description : "Describe what happened in detail..."}></textarea>
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
              <button type="submit" className="btn btn-info" onClick={this.handleSave}>Save Draft</button>
              <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
      
    )
  }
}


export default IncidentForm; 