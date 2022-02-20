import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { STAFFS } from './shared/staffs';
import './App.css';
import Staff from './Components/StaffList';

class App extends  Component {
  constructor(props) {
    super(props);
    this.state={
      staff: STAFFS
    };
  }
  
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
          <Staff staffs={this.state.staff} />
        </Navbar>
      </div>
        
    )
  }
}

export default App;
