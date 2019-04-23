import React, { Component } from 'react';

let defaultStyle = {
  display: 'flex',
  flexBasis: '50px', /* since header and footer are in a column, we can use flex basis to set the height */
  borderTop: '2px solid black',
  color: '#fff', 
  justifyContent: 'center',
  alignItems: 'center'
}

class Footer extends Component {
  render(){
    return(
      <div style={defaultStyle}>
        Copyright © 2019 Some Business Name
      </div>
    );
  }
}

export default Footer;
