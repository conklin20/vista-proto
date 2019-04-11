import React, { Component } from 'react';

const defaultStyle = {
  display: 'flex',
  // flex: '1 1 20%',
  /* 12em is the width of the columns */
  flex: '0 0 12em',
  borderRight: '2px solid black',
  backgroundColor: '#95a5a6',
  // color: '#fff'
}

class LeftSideBar extends Component {
  render(){
    return(
      <div style={defaultStyle}>
        Utilize this space as somewhere that quick action can be taken, or usable reporting can be viewed.
      </div>
    );
  }
}

export default LeftSideBar;
