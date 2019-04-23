import React, { Component } from 'react';
// import '../styles/alert.css'

const modalStyle = {
  overflowY: 'hidden'
}

class ActionForm extends Component {
  static defaultProps = {
    onClose() {}
  }

  constructor(props) {
    super(props);
  }
    
  render(){
    const alertType = this.props.alertType;
    const alertText = this.props.alertText; 
    const {onClose} = this.props;
    
    return(
      <div role="document" style={modalStyle}>
        <div>
          <h3>
            {alertType}!
          </h3>
          <span>{alertText}</span>
          <div className="modal-footer">
            <button type="button" className="btn btn-success" onClick={onClose}>OK</button>
            {/* <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={onClose}>Cancel</button> */}
          </div>
        </div>
      </div>
    )
  }
}


export default ActionForm; 