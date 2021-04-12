import React, { Component } from "react";
import './phone-list.css'
import AddPhone from './add-phone/add-phone'
import EditPhone from './edit-phone/edit-phone'

class PhoneList extends Component {
  state = {
    phones: [],
    showAddPhone: false,
    showEditPhone: false,
    photoPath: '', 
  }

  componentDidMount() { 
    this.getMobilePhones()
  }
  getMobilePhones(imageName) {
      this.state.showAddPhone = false
      this.state.showEditPhone=false
      fetch('http://localhost:5000/api/MobilePhones')
        .then(response=> response.json())
        .then(data => {
            this.setState({phones:data});
        })
  }

  removeMobile(id) {
    fetch('http://localhost:5000/api/MobilePhones/'+id,{
        method:'DELETE',
        header:{'Accept':'application/json',
        'Content-Type':'application/json'}
    }).then(() => this.getMobilePhones())
  }
  setOpenPopup(value) {
    this.setState({showAddPhone: value})
  }
  setEditValue(value) {
    this.setState({showEditPhone: value})
  }
  render() {
    return (

      <div>
        <div className="add-product" onClick={() => this.setOpenPopup( true)}>+  Add Product</div>``
      
      <div className="phone-list-page">
        <div className="header-list">
          <span>Image</span>
          <span>Brand</span>
          <span>Performance</span>
          <span>Price</span>
          <span className="btn-content">Edit</span>
          <span className="btn-content">Remove</span>
        </div>
        {
          this.state.phones.map((elem, index) => {
              return (
                  <div className="body-list" key={index}>
                    <span>
                      <img src={"http://localhost:5000/api/MobilePhones/GetPhoto/"+elem.Photo} height="100px"/>
                    </span>
                    <span>{elem.Brand}</span>
                    <span>{elem.Performance}</span>
                    <span>{elem.Price}</span>
                    <span className="fas fa-pencil-alt btn-content edit-icon"
                        onClick={() => this.setEditValue(elem)}></span>
                    <span className="far fa-trash-alt btn-content danger-icon"
                        onClick={() => this.removeMobile(elem.MobilePhonesID)}></span>
                  </div>
              )
          })
        }
        </div>
        <AddPhone showAddPhone={this.state.showAddPhone}
                  closeAddView={() => this.setOpenPopup(false)}
                  refreshList={() => this.getMobilePhones()} />
        
        {this.state.showEditPhone ?
        <EditPhone model={this.state.showEditPhone}
                   closeEditView={() => this.setEditValue(false)}
                   refreshList={() => this.getMobilePhones()} /> : 
                   ''} 
      </div>
     
     
    )
  }
}

export default PhoneList