import React, { Component } from 'react';
import '../styles/actionForm.css'
import { DateTime } from 'luxon';
import { convertToShortDate } from '../helpers/dateHelpers';

class ActionForm extends Component {
  static defaultProps = {
    onClose() {}
  }

  constructor(props) {
    super(props);
  }
    
  render(){
    const today = convertToShortDate(DateTime.local());
    const lookupData = this.props.lookupData; 
    const action = this.props.action.action; 
    const incidentRef = this.props.action.incidentRef;
    const {onClose} = this.props; 

    console.log(action); 
    
    return(
      <div role="document">
        <div>
          <div className="modal-header">
            <h3 className="modal-title">Review Action</h3>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-footer">
              <button type="button" className="btn btn-info">Save Changes</button>
              <button type="button" className="btn btn-primary">Close/Approve</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={onClose}>Cancel</button>
            </div>
          </div>
          {/* Body of Actipm Form */}
          <div className="modal-body">
            <form>
              {/* Action emp info */}
              <fieldset id="ActionEmp">
                <h4>Action Detail - Incident #{incidentRef}</h4>
                <div className="form-group formRow">
                  <div className="col-sm-6">
                    <label htmlFor="actionEmp">Action Employee</label>
                    <input type="text" className="form-control" id="actionEmp" aria-describedby="actionEmpHelp" defaultValue={action.assignedTo}/>
                    <small id="actionEmpHelp" className="form-text text-muted">Start typing a name, and then select it when you see it available in the list.</small>
                  </div>
                  <div className="col-sm-6">
                    <fieldset>
                      <label className="control-label" htmlFor="actionEmpSup">Supervisor</label>
                      <input className="form-control" id="actionEmpSup" type="text" placeholder="Auto-populate supervisor…" readOnly=""/>
                    </fieldset>
                  </div>
                </div>                
                <div className="form-group formRow">
                  <div className="col-sm-6">
                    <label htmlFor="estCompletionDate">Estimated Completion Date</label>
                    <input type="date" className="form-control" id="estCompletionDate" defaultValue={action.ecd} aria-describedby="estCompletionDateHelp" />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="reportingDate">Completion Date</label>
                    <input type="date" className="form-control" id="completionDate" defaultValue={action.cd} aria-describedby="completionDateHelp" />
                  </div>
                </div>
                <div className="form-group formRow">
                  <div className="col-sm-12">
                    <label htmlFor="actionDesc">Action Description</label>
                    <textarea className="form-control" id="actionDesc" rows="4" defaultValue={action.actionDesc} />
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-info">Save Changes</button>
            <button type="button" className="btn btn-primary">Close/Approve</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}


export default ActionForm; 