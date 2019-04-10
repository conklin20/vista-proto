import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Header extends Component {
  render(){
    return(
      <div>
        Header
      </div>
    );
  }
}

class RightSideBar extends Component {
  render(){
    return(
      <div>
        My Actions
      </div>
    );
  }
}

class LeftSideBar extends Component {
  render(){
    return(
      <div>
        What should go here?
      </div>
    );
  }
}

class Dashboard extends Component {
  render(){
    return(
      <div>
        <h2>Dashboard</h2>
        <div>
          List of open Inc... 
        </div>
        <div>
          Safe Days Report
        </div>
        <div>
          Open Incidents Report
        </div>
      </div>
    );
  }
}

class Footer extends Component {
  render(){
    return(
      <div>
        Dinkin' Flicka' Engineering 2019, All Rights Reserved
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Safety App!</h1>
        <Header/>
        <LeftSideBar/>
        <Dashboard/>
        <RightSideBar/>
        <Footer/>
      </div>
    );
  }
}

export default App;
