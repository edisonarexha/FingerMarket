import React, { Component } from "react";
import './laptop-list.css'
import AddLaptop from '../add-laptop/add-laptop'
import EditLaptop from '../edit-laptop/edit-laptop'
import DeleteLaptop from '../delete-laptop/delete-laptop'

class LaptopList extends Component {
  state = {
    laptops: [],
    showAddLaptop: false,
    showEditLaptop: false,
    showDeleteModal: false
  }
  componentDidMount() {
    this.getLaptops()
  }

  getLaptops() {
    this.state.showAddLaptop = false
    this.state.showEditLaptop = false
    this.state.showDeleteModal = false
    fetch('http://localhost:5000/api/Laptops')
        .then(response=> response.json())
        .then(data=>{
            this.setState({laptops:data});
        })
  }


  setOpenPopup(value) {
    this.setState({showAddLaptop: value})
  }
  setEditValue(value) {
    this.setState({showEditLaptop: value})
  }
  setDeleteValue(value) {
    this.setState({showDeleteModal: value})
  }

  render() {
    return (
      <div>
        <div className="add-product" onClick={() => this.setOpenPopup(true)}>+  Add Product</div>

        <div className="laptop-list-page">
            <div className="header-list">
            <span>Image</span>
            <span>Brand</span>
            <span>Performance</span>
            <span>Price</span>
            <span className="btn-content">Edit</span>
            <span className="btn-content">Remove</span>
          </div>
          {
            this.state.laptops.map((elem, index) => {
                return (
                    <div className="body-list" key={index}>
                      <span><img src={"http://localhost:5000/api/Laptops/GetPhoto/"+elem.Photo} height="150px"></img></span>
                      <span>{elem.Brand}</span>
                      <span>{elem.Performance}</span>
                      <span>{elem.Price}</span>
                      <span className="fas fa-pencil-alt btn-content edit-icon"
                        onClick={() => this.setEditValue(elem)}></span>
                      <span className="far fa-trash-alt btn-content danger-icon"
                          onClick={() => this.setDeleteValue(elem)}></span>
                    </div>
                )
            })
          }
        </div>
        <AddLaptop showAddLaptop={this.state.showAddLaptop}
                   closeAddView={() => this.setOpenPopup(false)}
                   refreshList={() => this.getLaptops()} />

        {this.state.showEditLaptop ?
          <EditLaptop model={this.state.showEditLaptop}
                   closeEditView={() => this.setEditValue(false)}
                         refreshList={() => this.getLaptops()} /> : 
                          ''} 

        {this.state.showDeleteModal ?
        <DeleteLaptop model={this.state.showDeleteModal}
                   closeDeleteView={() => this.setDeleteValue(false)}
                   refreshList={() => this.getLaptops()} /> : 
                   ''} 
      </div>
    )
  }
}

export default LaptopList