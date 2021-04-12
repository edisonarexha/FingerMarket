import React, { Component, useState } from "react";
import './home.css'
import PhoneList from '../phone/phone-list/phone-list'
import LaptopList from '../laptop/laptop-list/laptop-list'


class Home extends Component {
  
  state = {
    view: 'phone'
  }
  changeView(newView) {
    this.setState({
      view: newView
    })
  }

  render() {
    return (
      <div className="home-page">
          <div className="title-header">
            <div>Finger</div><div> &nbsp; Market</div>
          </div>

          <div className="body-text-home">
          You’ve got questions, we’ve got answers!
            <br></br>
            <br></br>
          Check our products, find what you need. 
          </div>
          <div className="buttons">
            <div className="mobile-phones" onClick={() => {this.changeView('phone')}}>Mobile Phones</div>
            <div className="pc-devices" onClick={() => {this.changeView('laptops')}}>Laptops</div>
          </div>
          {this.state.view === 'phone' ? <PhoneList/> : <LaptopList/>}
      </div>
    )
  }
}

export default Home

