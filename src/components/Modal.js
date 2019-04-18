import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 

// from https://www.youtube.com/watch?v=WGjv-p9jYf0

class Modal extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.modalTarget = document.createElement('div');
    // this.modalTarget.className = 'modal';
    document.body.appendChild(this.modalTarget); 
    this._render();
  }

  componentWillUpdate() {
    this._render(); 
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget); 
    document.body.removeChild(this.modalTarget); 
  }

  render() {
    return <noscript />; 
  }

  _render(){
    
    const modalSyles = {
      position: 'fixed', 
      top: this.props.children.props.modalDimensions ? this.props.children.props.modalDimensions.top : '80px', 
      left: this.props.children.props.modalDimensions ? this.props.children.props.modalDimensions.left : '200px', 
      right: this.props.children.props.modalDimensions ? this.props.children.props.modalDimensions.right : '200px', 
      bottom: this.props.children.props.modalDimensions ? this.props.children.props.modalDimensions.bottom : '80px', 
      border: '1px solid #ccc', 
      background: '#fff', 
      overflow: 'auto', 
      borderRadius: '10px', 
      outline: 'none', 
      padding: '20px', 
      display: 'block', 
      backdropFilter: 'blur(200px)'
    }

    ReactDOM.render(
      <div style={modalSyles}>{this.props.children}</div>, 
      this.modalTarget
    )
  }
}

export default Modal; 