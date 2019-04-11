import React, { Component } from 'react';

const defaultStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexBasis: '80px', /* since header and footer are in a column, we can use flex basis to set the height */
  alignItems: 'center',
  // borderBottom: '2px solid black',
  fontSize: '1.25em'
}

let logo = {
  src: 'vista-logo.png',
  alt: 'logo', 
  style: {
    width: '10%',
    height: '10%', 
    margin: '5px'
  }
}

const userStyle = {
  color: '#fff', 
  display: 'flex', 
  width: '15%', 
  justifyContent: 'space-between',
  marginRight: '30px'
}

class NavBar extends Component {
  constructor(props){
    super(props);
    

  }

  render(){
    return(
      <div style={defaultStyle}>
        <img {...logo} />
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Dashboard <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Report Incident</a>
              </li>    
            </ul>
          </div>
        </nav>
        <div style={userStyle}>
          <div>
            <span>Welcome, Bob!</span>
            <i style={{paddingLeft: '10px', paddingRight: '10px'}} className="far fa-user"></i>
          </div>
          <div>
            <a href="#">Log Out</a>
            <i style={{paddingLeft: '10px', paddingRight: '10px'}} class="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
