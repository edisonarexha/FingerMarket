import React, { Component } from "react";
import './edit-phone.css'
import {Dialog, DialogTitle, DialogContent} from '@material-ui/core'

class EditPhone extends Component{
    state = {
        Brand: null,
        Performance: null,
        Price: null,
        Photo: null,
        MobilePhonesID: null,
    }

    componentDidMount() {
        this.setState({
           ...this.props.model
        })
    }

    setBrand = (event) => {
    this.setState({Brand: event.target.value});
    }

    setPerformance = (event) => {
    this.setState({Performance: event.target.value});
    }
    
    setPrice = (event) => {
    this.setState({Price: event.target.value});
    }

    editPhoneDetails = () => {
        fetch('http://localhost:5000/api/MobilePhones',{
            method:'PUT',
            headers:{'Accept':'application/json',
            'Content-Type':'application/json;charset=utf-8'},
            body: JSON.stringify(this.state)
        }).then(() => this.props.refreshList())
    }

    handleFileSelected = (event) => {
      event.preventDefault();
      this.setState({Photo: event.target.files[0].name});
      const formData = new FormData();
      formData.append(
          "myFile",
          event.target.files[0],
          event.target.files[0].name
      );
  
      fetch('http://localhost:5000/api/MobilePhones/SaveFile',{
          method:'POST',
          body:formData
      })
      .then(res=>res.json())
      .then((result)=>{
        console.log(result)
      },
      (error)=>{
          alert('Failed');
      })
    }

render() {
    return (
      <Dialog className="dialog-wrapper" open={!!this.props.model}>
        <div class="dialog">
          <DialogTitle>
            <div className="title">
              <div>Edit product</div>
              <i class="fa fa-times" aria-hidden="true" onClick={this.props.closeEditView}></i>
              </div>
          </DialogTitle>
          <DialogContent class="container">
            <label>Brand</label>
            <input class="brand" type="text" placeholder="Brand" value={this.state.Brand} onChange={this.setBrand}></input>
            <label>Performance</label>
            <textarea class="performance" type="text" placeholder="Performance" value={this.state.Performance} onChange={this.setPerformance}></textarea>
            <label>Price</label>
            <input class="price" type="text" placeholder="Price" value={this.state.Price} onChange={this.setPrice}></input>
           
           
           {this.state.Photo ? <span><img src={"http://localhost:5000/api/MobilePhones/GetPhoto/"+this.state.Photo} height="220px"/> </span>:""}
           <div className="image-btn">
              <label for="image" className="label-button">{this.state.Photo ? 'Change Image' : 'Select Image'}</label>
              <input class="photo" style={{visibility:'hidden'}} type="file" id="image" placeholder="Photo" onChange={this.handleFileSelected}></input>
            </div>
            <div className="button" onClick={() => this.editPhoneDetails()} type="button">
            Save</div>
          </DialogContent></div>
      </Dialog>
    )
  }

}
export default EditPhone